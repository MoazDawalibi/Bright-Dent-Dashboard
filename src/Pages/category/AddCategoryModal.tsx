

import React, { useState } from 'react'
import LayoutModal from '../../Layout/Dashboard/LayoutModal'
import FormCategory from './FormCategory'
import { useAddCategory, useGetCategoryName } from '../../api/category'
import { getDataToSend, getInitialValues, getValidationSchema } from './formUtil'
import { QueryStatusEnum } from '../../config/QueryStatus'
import { useTranslation } from 'react-i18next'

function AddCategoryModal() {

  const [t] = useTranslation()
  const {mutate , status} = useAddCategory();
  const handelSubmit = (values:any )=>{

    values['category_id'] = values.name;

    const dataToSend = getDataToSend(values)

    mutate(dataToSend)
    // Submit Value
  }

  return (
    <LayoutModal
     isAddModal={true}
     getInitialValues={getInitialValues()} 
     handleSubmit={handelSubmit} 
     status={status as QueryStatusEnum}
     headerText={t('Add') +t('category')}
     getValidationSchema={getValidationSchema()}>

     {<FormCategory showSelect={true} />}
  </LayoutModal>
  )
}

export default AddCategoryModal

