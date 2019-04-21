import React from 'react'
import map from 'lodash/map'

import { storeContext } from '../lib'

const { StoreContext } = storeContext

const categories = [
  {
    label: 'self-worth',
    value: 'self-worth',
    colorClass: 'dark-blue'
  },
  {
    label: 'family',
    value: 'family',
    colorClass: 'mid-blue'
  },
  {
    label: 'friends',
    value: 'friends',
    colorClass: 'light-blue'
  },
  {
    label: 'health',
    value: 'health',
    colorClass: 'green'
  },
  {
    label: 'education',
    value: 'education',
    colorClass: 'light-green'
  },
  {
    label: 'career',
    value: 'career',
    colorClass: 'yellow'
  },
  {
    label: 'bucket list',
    value: 'bucketList',
    colorClass: 'orange'
  },
  {
    label: 'financial',
    value: 'financial',
    colorClass: 'dark-pink'
  },
  {
    label: 'love',
    value: 'love',
    colorClass: 'pink'
  },
  {
    label: 'other',
    value: 'other',
    colorClass: 'purple'
  }
]

const Category = ({ theme, activeCategory, onSelect }) => {
  return (
    <div className={`category ${theme}`}>
      {
        map(categories, ({ colorClass, label, value }) => {
          console.log('colorClass', colorClass)
          return (
            <div key={value} className={`item ${value === activeCategory ? 'active' : ''}`} onClick={() => onSelect(value)}>
              <span className={`color-tag circle ${colorClass}`} />
              <span className="category-name">{label}</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default Category