import React from 'react'
import './BigLoader.scss'

const BigLoader = () =>
   <div className={'big-loader'}>
       <div className={'lds-ring'}>
              <div/>
              <div/>
              <div/>
              <div/>
          </div>
       <div className={'big-loader__background'} />
   </div>

export default BigLoader
