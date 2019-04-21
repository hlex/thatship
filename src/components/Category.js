import React from 'react'
import map from 'lodash/map'

import { storeContext } from '../lib'

const { StoreContext } = storeContext

const categories = [
  {
    label: 'self-worth',
    value: 'self-worth',
  },
  {
    label: 'family',
    value: 'family',
  },
  {
    label: 'friends',
    value: 'friends',
  },
  {
    label: 'health',
    value: 'health',
  },
  {
    label: 'education',
    value: 'education',
  },
  {
    label: 'career',
    value: 'career',
  },
  {
    label: 'bucket list',
    value: 'bucketList',
  },
  {
    label: 'financial',
    value: 'financial',
  },
  {
    label: 'love',
    value: 'love',
  },
  {
    label: 'other',
    value: 'other',
  }
]

const Category = ({ theme, activeCategory, onSelect }) => {
  return (
    <div className={`category ${theme}`}>
      {
        map(categories, ({ colorClass, label, value }) => {
          return (
            <div key={value} className={`item ${value === activeCategory ? 'active' : ''}`} onClick={() => onSelect(value)}>
              <span className={`color-tag circle ${value}`} />
              <span className="category-name">{label}</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default Category