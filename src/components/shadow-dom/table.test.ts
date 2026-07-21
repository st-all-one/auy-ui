import { fixture, expect, html } from '@open-wc/testing'
import './table.js'
import type { AuyCompTable, Column } from './table.js'

const columns: Column[] = [
  { key: 'name', label: 'Nome', sortable: true },
  { key: 'age', label: 'Idade', sortable: true, align: 'right', format: 'number' },
  { key: 'salary', label: 'Salário', sortable: true, align: 'right', format: 'currency' },
  { key: 'born', label: 'Nascimento', sortable: true, format: 'date' },
]

const rows = [
  { name: 'Ana', age: 30, salary: 5000, born: '1994-05-10' },
  { name: 'Bruno', age: 25, salary: 3500, born: '1999-02-20' },
  { name: 'Carla', age: 35, salary: 8000, born: '1989-11-15' },
]

describe('AuyCompTable', () => {
  it('renderiza com colunas e linhas', async () => {
    const el = await fixture<AuyCompTable>(html`
      <auy-comp-table .columns=${columns} .rows=${rows}></auy-comp-table>
    `)
    const cells = el.shadowRoot?.querySelectorAll('[role="gridcell"]')
    expect(cells?.length).to.equal(columns.length * rows.length)
  })

  it('ordena ao clicar no cabeçalho', async () => {
    const el = await fixture<AuyCompTable>(html`
      <auy-comp-table .columns=${columns} .rows=${rows}></auy-comp-table>
    `)
    const header = el.shadowRoot?.querySelector('[part~="th-sortable"]') as HTMLElement
    header?.click()
    await el.updateComplete
    const cells = el.shadowRoot?.querySelectorAll('[role="gridcell"]')
    expect(cells?.[0]?.textContent).to.equal('Ana')
  })

  it('alterna direção de ordenação', async () => {
    const el = await fixture<AuyCompTable>(html`
      <auy-comp-table .columns=${columns} .rows=${rows}></auy-comp-table>
    `)
    const headers = el.shadowRoot?.querySelectorAll('[part~="th-sortable"]') as NodeListOf<HTMLElement>
    headers[0]?.click()
    await el.updateComplete
    headers[0]?.click()
    await el.updateComplete
    const cells = el.shadowRoot?.querySelectorAll('[role="gridcell"]')
    expect(cells?.[0]?.textContent).to.equal('Carla')
  })

  it('mostra mensagem vazia', async () => {
    const el = await fixture<AuyCompTable>(html`
      <auy-comp-table .columns=${columns} .rows=${[]}></auy-comp-table>
    `)
    const empty = el.shadowRoot?.querySelector('[part~="empty-row"]')
    expect(empty).to.exist
    expect(empty?.textContent).to.include('Nenhum registro encontrado')
  })

  it('estado de loading', async () => {
    const el = await fixture<AuyCompTable>(html`
      <auy-comp-table .columns=${columns} .rows=${rows} loading></auy-comp-table>
    `)
    const loading = el.shadowRoot?.querySelector('[part~="loading"]')
    expect(loading).to.exist
    expect(loading?.textContent).to.include('Carregando')
  })

  it('renderiza formato de moeda', async () => {
    const el = await fixture<AuyCompTable>(html`
      <auy-comp-table .columns=${columns} .rows=${rows}></auy-comp-table>
    `)
    const cells = el.shadowRoot?.querySelectorAll('[role="gridcell"]')
    const salaryCell = cells?.[2] as HTMLElement
    expect(salaryCell?.textContent).to.include('5.000,00')
  })

  it('renderiza formato de data', async () => {
    const el = await fixture<AuyCompTable>(html`
      <auy-comp-table .columns=${columns} .rows=${rows}></auy-comp-table>
    `)
    const cells = el.shadowRoot?.querySelectorAll('[role="gridcell"]')
    const dateCell = cells?.[3] as HTMLElement
    expect(dateCell?.textContent).to.include('10/05/1994')
  })
})
