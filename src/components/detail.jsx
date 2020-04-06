import React, { useState, useEffect } from 'react';
import ReactIntense from 'react-intense';
import './detail_style.css';
import './loader.css'
import api from '../api'

const { getOne } = api();

function Detail(props) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
        setLoading(true);
        const { match: { params } } = props;
        const res = await getOne(params.id);
        setData(res);
        setLoading(false);
    }
    fetchData();
  }, [])


  if (loading) {
    return <div>loading....</div>;
  }

  return(
    <div className="detailPage">
      <div className="wall">
        <div className="picture_container">
          {data.webImage && <ReactIntense className="image" src={data.webImage.url} />}
          <div className="label">{data.title}</div>
        </div>
      </div>
      {data.principalMakers &&
        <div className="bookSection">
          <div className="wrapper">
            <article className="front">
             <h1>{data.title}</h1>
            </article>
            <article className="p1">
              <h1>About the author</h1>
              <ul>
                <li>Place of Birth: {data.principalMakers[0].placeOfBirth}</li>
                <li>Date of Birth: {data.principalMakers[0].dateOfBirth}</li>
                <li>Date of Death: {data.principalMakers[0].dateOfDeath}</li>
                <li>Place of Death: {data.principalMakers[0].placeOfDeath}</li>
                <li>Occupation: {data.principalMakers[0].occupation}</li>
                <li>Production place: {data.productionPlaces[0]}</li>
                <li>Dating; {data.dating.presentingDate}</li>
              </ul>
            </article>
            <article className="p2">
            <h1>About the artwork</h1>
            <p>
              {data.description}
            </p>
            </article>
            <article className="back">
            </article>
          </div>
        </div>
      }
    </div>
  )
}

export default Detail;
