import _ from 'lodash'

export const appCategories = [
  {
    label: 'self-worth',
    value: 'self-worth',
    colorClass: 'dark-blue',
    colorCode: '#3e4c9b'
  },
  {
    label: 'family',
    value: 'family',
    colorClass: 'mid-blue',
    colorCode: '#4b93d0'
  },
  {
    label: 'friends',
    value: 'friends',
    colorClass: 'light-blue',
    colorCode: '#94d2dc'
  },
  {
    label: 'health',
    value: 'health',
    colorClass: 'green',
    colorCode: '#66966f'
  },
  {
    label: 'education',
    value: 'education',
    colorClass: 'light-green',
    colorCode: '#b9d26b'
  },
  {
    label: 'career',
    value: 'career',
    colorClass: 'yellow',
    colorCode: '#feda40'
  },
  {
    label: 'bucket list',
    value: 'bucketList',
    colorClass: 'orange',
    colorCode: '#f7a800'
  },
  {
    label: 'financial',
    value: 'financial',
    colorClass: 'dark-pink',
    colorCode: '#e6005d'
  },
  {
    label: 'love',
    value: 'love',
    colorClass: 'pink',
    colorCode: '#f097af'
  },
  {
    label: 'other',
    value: 'other',
    colorClass: 'purple',
    colorCode: '#a870ad'
  }
]

export const getCategoryColorCode = (categoryValue) => {
  return _.get(_.find(appCategories, category => category.value === categoryValue), 'colorCode', '#FFF');
}