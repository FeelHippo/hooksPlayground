import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-component';
import { StackCard } from 'react-stack-cards';
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button,
  InputGroup,
  FormInput,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "shards-react";
import { Alert } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import './loader.css';
import BackgroundImage from './images/gogh.jpg'
import api from '../api';

const homePage = {
  position: 'absolute',
  margin: '0',
  width: '100vw',
  height: 'auto',
  backgroundImage: `url(${BackgroundImage})`,
  backgroundSize: 'cover'
}

const inputStyle = {
  width: '50%',
  height: 'auto',
  margin: '3rem auto'
}

const masonryOptions = {
    transitionDuration: 0
};

const masonStyle = {
  width: '80%',
  padding: '0',
  margin: '2rem auto'
}

const cardStyle = {
  margin: '2rem 2rem'
}

const img_style = {
  width: '100%',
  margin: '0 auto',
  opacity: '0.5'
}

const { getMany } = api();

function Gallery() {
  const [search, setSearch] = useState('');
  const [option, setOption] = useState('q');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await getMany(option, search)
      setData(res.artObjects);
      setIsLoading(true);
    }
    fetchData();
  }, [option, search]);

  return (
    <div style={homePage}>
      <InputGroup style={inputStyle}>
        <FormInput placeholder="What are you looking for?" value={search} onChange={ e => setSearch(e.target.value)} />
        <Dropdown
          addonType="append"
          open={open}
          toggle={() => setOpen(!open)}
        >
          <DropdownToggle caret>Options</DropdownToggle>
          <DropdownMenu right onChange={ e => setOption(e.target.value) }>
            <DropdownItem value="q">All results</DropdownItem>
            <DropdownItem value="involvedMaker">Author</DropdownItem>
            <DropdownItem value="productionPlaces">Place</DropdownItem>
            <DropdownItem value="presentingDate">Date</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </InputGroup>


      <Masonry
          className={'masonry-ul'}
          options={masonryOptions}
          style={masonStyle}
      >
      {data ?
        data.map((art, i) => {
          return (
            <div key={art.id} style={cardStyle}>
            <Link to={`/${art.objectNumber}`} style={{ textDecoration: 'none' }}>
                <Card style={{ maxWidth: "240px", textDecoration: 'none' }} outline={true} small={true}>
                  <CardHeader>{art.principalOrFirstMaker}</CardHeader>
                  <CardImg src={art.headerImage.url} style={img_style}/>
                  <CardBody>
                    <CardTitle>{art.longTitle}</CardTitle>
                    <p>{art.title}</p>
                  </CardBody>
                  <CardFooter>{art.productionPlaces}</CardFooter>
                </Card>
            </Link>

            </div>
          )
        })
        : <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      }
      </Masonry>
    </div>
  )
}

export default Gallery
