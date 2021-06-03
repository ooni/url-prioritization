// {
//   country_code: "US",
//   new_entry: [
//       "https://www.example.com/",
//       "FILE",
//       "File-sharing",
//       "2017-04-12",
//       "",
//       "",
//   ],
//   comment: "add example URL",
// }

import React, { useCallback, useRef, useState } from 'react'
import { Flex, Box, Input, Button } from 'ooni-components'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

import { addURL } from '../../components/lib/api'
import CategoryList from './CategoryList'
import categories from '../lib/category_codes.json'

const fields = [
  {
    name: 'url',
    type: 'text',
    placeholder: 'https://ooni.org',
    required: true
  },
  {
    name: 'notes',
    type: 'textarea',
    required: true,
    placeholder: 'Notes',
    size: 60
  },
]

const AddURL = ({ cc, onAddRule }) => {
  const formRef = useRef()
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const today = new Date().toLocaleDateString()
    const categoryCode = formData.get('category_code')
    const categoryDesc = categories[categoryCode]
    const newEntry = [
      formData.get('url'),
      categoryCode,
      categoryDesc,
      today,
      '',
      formData.get('notes')
    ]

    const notes = formData.get('comment')

    addURL(newEntry, cc, notes).then(() => {
      setError(null)
      console.log('AddURL successful')
    }).catch(e => {
      // TODO: Show this error somewhere. maybe where the action was performed
      setError(`AddURL failed: ${e.response.data.error}`)
    })
  })

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <Flex alignItems='center' justifyContent='space-between' my={2}>
        <input {...fields[0]} />
        <CategoryList name='category_code'  />
        <input {...fields[1]} />
      </Flex>
      <textarea name='comment' placeholder='Comment' />
      <Box my={2}><button p={3} type='submit'> Add </button></Box>
      <Box as='small' color='red6'> Errors: {error || 'None'} </Box>
    </form>
  )
}

export default AddURL