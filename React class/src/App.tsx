
import './App.css'
//import { ProductCard } from './components/ProductCard/ProductCard'
import { Gallery } from './components/Gallery/Gallery'
import { MainArticle } from './components/MainArticle/MainArticle'
import { List } from './components/List/List'
import { useState } from 'react';
import { CheesecakeRecipe } from './components/CheesecakeRecipe/CheesecakeRecipe';
import { Quiz } from './components/Quiz/Quiz';

function App() {
  const [howMany, setHowMany] = useState(5);
  return (
    <>
      {/* <ProductCard
        productName="Smartphone X"
        productDescription="Latest model with all the best features."
        price="$999.99" />
      <ProductCard
        productName="Headphones"
        productDescription="Good sound good quality."
        price="$299.99" />
      <ProductCard
        productName="Radiator"
        productDescription="Good for heating."
        price="$199.99" /> */}
      {/* <Gallery title='HI' images={["s", "t"]} />
      <MainArticle />
      <List /> */}
      {/* <p>{howMany}</p>
      <button onClick={() => setHowMany(howMany + 1)} >Increase how many</button> */}
      {/* <CheesecakeRecipe title="My amazing cheesecake"
        image="https://images.pexels.com/photos/4078187/pexels-photo-4078187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        instructions='Bake the cake then eat it' /> */}
      <Quiz />


    </>
  )
}

export default App
