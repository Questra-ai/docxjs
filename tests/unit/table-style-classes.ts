/**
 * Unit checks for table-style conditional class derivation (tblLook → row/cell classes).
 * Run: pnpm exec tsx tests/unit/table-style-classes.ts
 */
import { DOMParser } from '@xmldom/xmldom'
import { HtmlRenderer } from '../../src/html-renderer'
import { DomType, WmlTable } from '../../src/document/dom'
import { DocumentParser } from '../../src/document-parser'

;(globalThis as any).DOMParser = DOMParser
;(globalThis as any).Node = { ELEMENT_NODE: 1, TEXT_NODE: 3 }

function assert(cond: unknown, msg: string) {
	if (!cond) throw new Error(msg)
}

function cell() {
	return { type: DomType.Cell, children: [] as any[] }
}

function row(cells: number) {
	return { type: DomType.Row, children: Array.from({ length: cells }, cell) }
}

const renderer = new HtmlRenderer()
const table = {
	type: DomType.Table,
	className: 'first-row first-col no-vband',
	styleName: 'Table1',
	rowBandSize: 1,
	children: [row(2), row(2), row(2), row(2)],
} as WmlTable

renderer.applyTableStyleConditionalClasses(table)

assert(table.children[0].className === 'first-row', `row0: ${table.children[0].className}`)
assert(table.children[1].className === 'odd-row', `row1: ${table.children[1].className}`)
assert(table.children[2].className === 'even-row', `row2: ${table.children[2].className}`)
assert(table.children[3].className === 'odd-row', `row3: ${table.children[3].className}`)
assert(table.children[0].children[0].className === 'first-col', 'cell 0,0 first-col')
assert(!table.children[0].children[1].className, 'cell 0,1 no vband class')

// Respect existing cnfStyle classes
const withCnf = {
	type: DomType.Table,
	className: 'first-row',
	children: [
		{ type: DomType.Row, className: 'first-row odd-row', children: [cell()] },
		{ type: DomType.Row, children: [cell()] },
	],
} as WmlTable
renderer.applyTableStyleConditionalClasses(withCnf)
assert(withCnf.children[0].className === 'first-row odd-row', 'cnfStyle preserved')
assert(withCnf.children[1].className === 'odd-row', 'body row still banded')

// Plain tables without tblLook stay unchanged
const plain = {
	type: DomType.Table,
	children: [row(1), row(1)],
} as WmlTable
renderer.applyTableStyleConditionalClasses(plain)
assert(!plain.children[0].className, 'no classes without tblLook')

// Parser emits cell-targeted band selectors with fills
const parser = new DocumentParser({ debug: false } as any)
const styleXml = `<?xml version="1.0"?>
<w:style xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" w:type="table" w:styleId="T">
  <w:tblStylePr w:type="firstRow"><w:tcPr><w:shd w:fill="5b9bd5" w:val="clear"/></w:tcPr></w:tblStylePr>
  <w:tblStylePr w:type="band1Horz"><w:tcPr><w:shd w:fill="deebf6" w:val="clear"/></w:tcPr></w:tblStylePr>
</w:style>`
const styleEl = new DOMParser().parseFromString(styleXml, 'application/xml').documentElement
const parsed = parser.parseStyle(styleEl as any)
const first = parsed.styles.find(s => s.target === 'tr.first-row td')
const band = parsed.styles.find(s => s.target === 'tr.odd-row td')
assert(first?.values['background-color'] === '#5b9bd5', `firstRow fill: ${first?.values['background-color']}`)
assert(band?.values['background-color'] === '#deebf6', `band fill: ${band?.values['background-color']}`)

console.log('OK table-style-classes')
