import React from 'react'
import { shallow, mount, describeWithDOM } from 'enzyme'
import { expect } from 'chai'
import App from './App'

/*
 *  Shallow
 */

describe(`<App />`, () => {
  it(`should exist`, () => {
    let app = shallow(<App />)
    expect(app).to.exist
  })
})

/*
 *  With DOM
 */

describeWithDOM(`<App />`, () => {
  it(`should exist`, () => {
    let app = mount(<App />)
    expect(app).to.exist
  })
})
