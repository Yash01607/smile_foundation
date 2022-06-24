import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GET_COLLECTIONS_LIST } from '../GraphQL/Collections/Querries';
import { GET_PRODUCT_LIST } from '../GraphQL/Products/Querries';

import CategoryCard from '../Components/CategoryCard';
import Product from '../Components/Product';
import MessageBox from '../Components/MessageBox';

import { BiChevronRight } from 'react-icons/bi';
import { BiChevronLeft } from 'react-icons/bi';

import Rectangle_1 from '../Assets/Images/Rectangle_1.jpg';

import Rectangle11 from '../Assets/Images/Rectangle11.png';
import Rectangle12 from '../Assets/Images/Rectangle12.png';
import Rectangle13 from '../Assets/Images/Rectangle13.png';
import Rectangle14 from '../Assets/Images/Rectangle14.png';

import Rectangle21 from '../Assets/Images/Rectangle21.png';
import Rectangle22 from '../Assets/Images/Rectangle22.png';

import Rectangle31 from '../Assets/Images/Rectangle31.png';
import Rectangle33 from '../Assets/Images/Rectangle33.png';
import Rectangle32 from '../Assets/Images/Rectangle32.png';

import Rectangle41 from '../Assets/Images/Rectangle41.png';

import Rectangle51 from '../Assets/Images/Rectangle51.png';
import Rectangle52 from '../Assets/Images/Rectangle52.png';
import Rectangle53 from '../Assets/Images/Rectangle53.png';
import Rectangle54 from '../Assets/Images/Rectangle54.png';
import LoadingSpinner from '../Components/LoadingSpinner';

function HomeScreen() {
  const [currentIndex, setcurrentIndex] = useState(0);

  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_PRODUCT_LIST);
  const {
    data: dataCollections,
    loading: loadingCollections,
    error: errorColections,
  } = useQuery(GET_COLLECTIONS_LIST);

  let categoryArrayModified;

  if (
    dataCollections &&
    dataCollections.collections &&
    dataCollections.collections.items
  ) {
    const numsPerGroup = Math.ceil(
      dataCollections.collections.items.length / 7
    );
    categoryArrayModified = new Array(numsPerGroup)
      .fill('')
      .map((_, i) =>
        dataCollections.collections.items.slice(i * 7, (i + 1) * 7)
      );
    // categoryArrayModified.map((categoryArray) => {
    //   return console.log(categoryArray, '1234');
    // });
  }

  const decreaseCurrentIndex = () => {
    if (currentIndex > 0) {
      setcurrentIndex(currentIndex - 1);
    }
  };
  const increaseCurrentIndex = () => {
    if (currentIndex < categoryArrayModified.length - 1) {
      setcurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <div className="head-page body-pad">
        <div className="head-page-div">
          <h2>Breathe life into your</h2>
          <h1>Home Decor</h1>
          <p className="first">
            Buy Handicraft's online from Smile Foundation's handmade bastket
            store.
          </p>
          <p className="second">
            These are the best Handicraft items in your homes.
          </p>
          <button onClick={() => navigate('/shop')}>View Shop</button>
        </div>
        <div>
          <img className="head-image" alt="headA" src={Rectangle_1}></img>
        </div>
      </div>
      <div className="row head-info body-pad">
        <div>
          <h1>5000</h1>
          <div id="border-bottom"></div>
          <p>Artisan livelhood supported</p>
        </div>
        <div>
          <h1>100</h1>
          <div id="border-bottom"></div>
          <p>Producer groups gngaged</p>
        </div>
        <div>
          <h1>16</h1>
          <div id="border-bottom"></div>
          <p>Craft lines available</p>
        </div>
        <div>
          <h1>70</h1>
          <div id="border-bottom"></div>
          <p>Producers are women</p>
        </div>
      </div>
      <div className="process-info body-pad">
        <h1>How your Handmade products are made.</h1>
        <div className="process-info-card row">
          <div>
            <img alt="headA" src={Rectangle11}></img>
            <h2>Timeless Designs</h2>
            <p>
              All of our products are designed such that they remain appealing
              through....
            </p>
          </div>
          <div>
            <img alt="headA" src={Rectangle12}></img>
            <h2>Quality</h2>
            <p>
              All of our products are handmade and made up of natural fbre but
              we ensure that....
            </p>
          </div>
          <div>
            <img alt="headA" src={Rectangle13}></img>
            <h2>Eco Friendly</h2>
            <p>
              The core of all our designs though is to create eco-friendly
              products that our...
            </p>
          </div>
          <div>
            <img alt="headA" src={Rectangle14}></img>
            <h2>Household industry</h2>
            <p>
              All of our products are made by artisians from the comfort of
              their homes.They work....
            </p>
          </div>
        </div>
      </div>
      <div className="row about-info body-pad">
        <div className="about-info-div">
          <img alt="headA" src={Rectangle21}></img>
        </div>
        <div className="about-info-div">
          <div id="border-centre"></div>
          <h2>Lorem Ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </p>
        </div>
        <div className="about-info-div">
          <img alt="headA" src={Rectangle22}></img>
        </div>
      </div>
      <div className="body-pad buyers-review">
        <h1>See what our buyers say about Handicraft Items</h1>
        <div className="row">
          <div className="buyers-review-div">
            <img alt="headA" src={Rectangle31}></img>
            <div id="border-left"></div>
            <h2>
              I serve my bread and cheese int his antique hand woven rustic
              basket. Infact ordered two more.
            </h2>
            <p>-Priti verma</p>
            <p>Handmade SababiGrass Bread Basket @ Buyer - INDIA</p>
          </div>
          <div className="buyers-review-div">
            <img alt="headA" src={Rectangle32}></img>
            <div id="border-centre"></div>
            <h2>
              I love the okahi roti box. It in beautifully crafted & a pleasure
              to use.Adds elegane to my dining table.
            </h2>
            <p>-Shukti verma</p>
            <p>Handmade Sababi Grass Roti Box @ Buyer - INDIA</p>
          </div>
          <div className="buyers-review-div">
            <img alt="headA" src={Rectangle33}></img>
            <div id="border-centre"></div>
            <h2>
              It is a great piece. Worth for investment, Cant wait to flaunt it.
            </h2>
            <p>-Asha</p>
            <p>Handmade Bamboo Cereal Tray @ Buyer - INDIA</p>
          </div>
        </div>
      </div>
      <div className="feaured-products body-pad">
        <p>For this Season</p>
        <h1>Featured Products</h1>
        <div className="row">
          {loading && <LoadingSpinner />}
          {error && error.message && (
            <MessageBox className="error">{error.message}</MessageBox>
          )}
          {data && data.products && data.products.errorCode && (
            <MessageBox className="error">{data.products.message}</MessageBox>
          )}
          {!data ? (
            <MessageBox className="loading">No Products Founs</MessageBox>
          ) : (
            data.products.items.slice(0, 8).map((product) => {
              return <Product id={product.id}></Product>;
            })
          )}
        </div>
      </div>
      <div className="body-pad explore-categories">
        <h1>Explore Categories</h1>
        {loadingCollections && <LoadingSpinner />}
        {errorColections && errorColections.message && (
          <MessageBox className="error">{errorColections.message}</MessageBox>
        )}
        {dataCollections &&
          dataCollections.collections &&
          dataCollections.collections.errorCode && (
            <MessageBox className="error">
              {dataCollections.collections.message}
            </MessageBox>
          )}
        {!dataCollections ? (
          <MessageBox className="loading">No Categories Founs</MessageBox>
        ) : (
          categoryArrayModified && (
            <div className="row explore-categories-div">
              <div className="category-scroll-icon-left">
                <BiChevronLeft onClick={decreaseCurrentIndex} size={30} />
              </div>
              <div>
                <div className="top-category row">
                  <div
                    className="small"
                    onClick={() =>
                      navigate(
                        `/productlist/collection/${categoryArrayModified[currentIndex][0].id}/user/0`
                      )
                    }
                  >
                    {categoryArrayModified[currentIndex][0] && (
                      <CategoryCard
                        id={categoryArrayModified[currentIndex][0].id}
                      ></CategoryCard>
                    )}
                  </div>
                  <div
                    className="small"
                    onClick={() =>
                      navigate(
                        `/productlist/collection/${categoryArrayModified[currentIndex][1].id}/user/0`
                      )
                    }
                  >
                    {categoryArrayModified[currentIndex][1] && (
                      <CategoryCard
                        id={categoryArrayModified[currentIndex][1].id}
                      ></CategoryCard>
                    )}
                  </div>
                </div>
                <div
                  className="medium"
                  onClick={() =>
                    navigate(
                      `/productlist/collection/${categoryArrayModified[currentIndex][2].id}/user/0`
                    )
                  }
                >
                  {categoryArrayModified[currentIndex][2] && (
                    <CategoryCard
                      id={categoryArrayModified[currentIndex][2].id}
                    ></CategoryCard>
                  )}
                </div>
              </div>
              <div
                className="large"
                onClick={() =>
                  navigate(
                    `/productlist/collection/${categoryArrayModified[currentIndex][3].id}/user/0`
                  )
                }
              >
                {categoryArrayModified[currentIndex][3] && (
                  <CategoryCard
                    id={categoryArrayModified[currentIndex][3].id}
                  ></CategoryCard>
                )}
              </div>
              <div>
                <div
                  className="top-category medium"
                  onClick={() =>
                    navigate(
                      `/productlist/collection/${categoryArrayModified[currentIndex][4].id}/user/0`
                    )
                  }
                >
                  {categoryArrayModified[currentIndex][4] && (
                    <CategoryCard
                      id={categoryArrayModified[currentIndex][4].id}
                    ></CategoryCard>
                  )}
                </div>
                <div className="row">
                  <div
                    className="small"
                    onClick={() =>
                      navigate(
                        `/productlist/collection/${categoryArrayModified[currentIndex][5].id}/user/0`
                      )
                    }
                  >
                    {categoryArrayModified[currentIndex][5] && (
                      <CategoryCard
                        id={categoryArrayModified[currentIndex][5].id}
                      ></CategoryCard>
                    )}
                  </div>
                  <div
                    className="small"
                    onClick={() =>
                      navigate(
                        `/productlist/collection/${categoryArrayModified[currentIndex][6].id}/user/0`
                      )
                    }
                  >
                    {categoryArrayModified[currentIndex][6] && (
                      <CategoryCard
                        id={categoryArrayModified[currentIndex][6].id}
                      ></CategoryCard>
                    )}
                  </div>
                </div>
              </div>
              <div className="category-scroll-icon-right">
                <BiChevronRight onClick={increaseCurrentIndex} size={30} />
              </div>
            </div>
          )
        )}
      </div>
      <div className="body-pad support-artist">
        <div className="row">
          <div className="support-content">
            <h1>Supporting the Artisians</h1>
            <p>
              We encouraged our Artisans to explore the market and go to the
              Exhibitions to learn new things and learn about New Products. We
              support our Artisans to enter and thrive in the Online market.
            </p>
            <p>
              We support our Artisans in Reviving traditional designs,
              organizing Exhibitions and workshops to grow a healthy
              relationship between the Craftspeople and customer.
            </p>
            <p>
              Smile Foundation is a Non-Government Organization that always
              motivates Craftspeople to follow fair trade practices. We don't
              use child labor and always promote a healthy work environment.
            </p>
          </div>
          <div className="support-image">
            <img alt="headA" src={Rectangle41}></img>
          </div>
        </div>
        <div className="row">
          <div
            className="artists"
            onClick={() => navigate(`/productlist/collection/0/user/1`)}
          >
            <img alt="headA" src={Rectangle51}></img>
            <p>Rabari Casaba</p>
          </div>
          <div
            className="artists"
            onClick={() => navigate(`/productlist/collection/0/user/1`)}
          >
            <img alt="headA" src={Rectangle52}></img>
            <p>Shithila Rowhi</p>
          </div>
          <div
            className="artists"
            onClick={() => navigate(`/productlist/collection/0/user/1`)}
          >
            <img alt="headA" src={Rectangle53}></img>
            <p>Nithiba satyogi</p>
          </div>
          <div
            className="artists"
            onClick={() => navigate(`/productlist/collection/0/user/1`)}
          >
            <img alt="headA" src={Rectangle54}></img>
            <p>Suboyu Chandran</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
