import {formatAmount} from './utils'

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
