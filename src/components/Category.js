import React from 'react'
import map from 'lodash/map'

import { appCategories } from '../utils'

const Category = ({ theme, activeCategory, onSelect }) => {
  return (
    <div className={`category ${theme}`}>
      {
        map(appCategories, ({ label, value }) => {
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