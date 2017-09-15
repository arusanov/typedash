const templates = require('../src/typedash')

describe('Templates test', () => {
  it('template object', () => {
    const tmpl = templates.template('Hello {{boy}}')
    expect(tmpl({boy: 'George'})).toEqual('Hello George')
  })

  it('template object deep', () => {
    const tmpl = templates.template('Hello {{boy.firstName}} {{boy.lastName}}')
    expect(tmpl({boy: {firstName: 'George', lastName: 'Michael'}})).toEqual('Hello George Michael')
  })

  it('template with conditions', () => {
    const tmpl = templates.template('Hello {{typeof boy!==\'undefined\' ? boy.firstName:\'Unknown\'}}')
    expect(tmpl({boy: {firstName: 'George', lastName: 'Michael'}})).toEqual('Hello George')
    expect(tmpl({})).toEqual('Hello Unknown')
  })

  it('template with expressions', () => {
    const tmpl = templates.template('Hello {{ if (typeof boy!==\'undefined\') { out.push(boy.firstName) } }}')
    expect(tmpl({boy: {firstName: 'George', lastName: 'Michael'}})).toEqual('Hello George')
    expect(tmpl({})).toEqual('Hello ')
  })

  it('template with options', () => {
    const tmpl = templates.template('Hello {{ if (typeof boy!==\'undefined\') { foo.push(boy.firstName) } }}', {
      outName: 'foo',
      dataName: 'bar'
    })
    expect(tmpl({boy: {firstName: 'George', lastName: 'Michael'}})).toEqual('Hello George')
    expect(tmpl({})).toEqual('Hello ')
  })
})
