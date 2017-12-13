import { formatAmount, formatDate, getFormFieldValue } from './utils'

describe('formatAmount', () => {
  it('renders positive values', () => {
    const formattedAmount = formatAmount(999)
    expect(formattedAmount).toEqual('9.99 Euro')
  })

  it('renders positive values less than one 100', () => {
    const formattedAmount = formatAmount(19)
    expect(formattedAmount).toEqual('0.19 Euro')
  })

  it('renders positive negative values', () => {
    const formattedAmount = formatAmount(-999)
    expect(formattedAmount).toEqual('-9.99 Euro')
  })

  it('renders negative values less than one 100', () => {
    const formattedAmount = formatAmount(-19)
    expect(formattedAmount).toEqual('-0.19 Euro')
  })
})

describe('formatDate', () => {
  it('renders date with different input strings', () => {
    expect(formatDate('2017-11-11 15:28')).toEqual('2017-11-11')
    expect(formatDate('2017-11-11T11:00:00Z')).toEqual('2017-11-11')
    expect(formatDate('2017-11-11')).toEqual('2017-11-11')
  })
})

describe('getFormFieldValue', () => {
  it('returns true for checked checkbox', () => {
    const target = {type: 'checkbox', checked: true}
    expect(getFormFieldValue(target)).toEqual(true)
  })

  it('returns true false for unchecked checkbox', () => {
    const target = {type: 'checkbox', checked: false}
    expect(getFormFieldValue(target)).toEqual(false)
  })

  it('returns value for text input', () => {
    const target = {type: 'input', value: 'Humpty'}
    expect(getFormFieldValue(target)).toEqual('Humpty')
  })

  it('returns value for textarea', () => {
    const target = {type: 'textarea', value: 'This is a long text'}
    expect(getFormFieldValue(target)).toEqual('This is a long text')
  })

  it('returns value for select', () => {
    const target = {type: 'select', value: '73215'}
    expect(getFormFieldValue(target)).toEqual('73215')
  })

  it('returns array with selected options for multiple-select', () => {
    const options = [
      {value: 121, selected: true},
      {value: 324, selected: false},
      {value: 3, selected: true},
      {value: 478, selected: false}
    ]
    const target = {type: 'select-multiple', options}
    expect(getFormFieldValue(target)).toEqual([121, 3])
  })

  it('returns empty array for multiple-select without selected options', () => {
    const options = [
      {value: 121, selected: false},
      {value: 324, selected: false},
      {value: 3, selected: false},
      {value: 478, selected: false}
    ]
    const target = {type: 'select-multiple', options}
    expect(getFormFieldValue(target)).toEqual([])
  })
})
