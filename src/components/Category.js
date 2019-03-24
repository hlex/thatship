import React from 'react'
import map from 'lodash/map'

const categories = [
  {
    label: 'self-worth',
    value: 'self-worth',
    color: '#3e4c9b'
  },
  {
    label: 'family',
    value: 'family',
    color: '#4b93d0'
  },
  {
    label: 'friends',
    value: 'friends',
    color: '#94d2dc'
  },
  {
    label: 'health',
    value: 'health',
    color: '#66966f'
  },
  {
    label: 'education',
    value: 'education',
    color: '#b9d26b'
  },
  {
    label: 'career',
    value: 'career',
    color: '#feda40'
  },
  {
    label: 'bucket list',
    value: 'bucketList',
    color: '#f7a800'
  },
  {
    label: 'financial',
    value: 'financial',
    color: '#e6005d'
  },
  {
    label: 'love',
    value: 'love',
    color: '#f097af'
  },
  {
    label: 'other',
    value: 'other',
    color: '#a870ad'
  }
]

const Category = ({ activeCategory }) => {
  return (
    <div className="category">
      {
        map(categories, ({ color, label, value }) => {
          return (
            <div key={value} className={`item ${value === activeCategory ? 'active' : ''}`}>
              <span className="color-tag circle" style={{ backgroundColor: `${color}` }} />{label}
            </div>
          )
        })
      }
    </div>
  )
}

export default Category