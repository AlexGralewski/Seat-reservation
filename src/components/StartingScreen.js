import React from 'react'
import {Button, InputNumber, Checkbox} from 'antd'



const StartingScreen = () => (
  <div className='starting-screen'>
    <span>Liczba miejsc:</span>
    <InputNumber size="large" min={1} max={30} defaultValue={1} />
    <br/>
    <Checkbox > Czy miejsca mają być obok siebie? </Checkbox>
    <br/>
    <Button>Wybierz miejsca</Button>
  </div>
)

export default StartingScreen