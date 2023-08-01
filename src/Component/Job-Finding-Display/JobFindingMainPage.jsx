import "./../JobFinding/Jobfinding.css";
import Container from "react-bootstrap/Container";
import Joblistingdata from "../../../public/data.json";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const JobFindingMainPage = () => {
  const [joblist, setJoblisting] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [updatequery, setUpdatequery] = useState(null);
  //   const searchGet = searchParams.get("");

  useEffect(() => {
    setJoblisting([...Joblistingdata]);
  }, []);

  useEffect(() => {
    const geturl = searchParams.toString();
    const Params = new URLSearchParams(geturl);

    const GetparamItem = [...Params].map(([key, value]) => {
      return {
        [key]: value,
      };
    });

    setUpdatequery(Object.assign({}, ...GetparamItem));
  }, []);

  const filterSearchResult =
    joblist.length > 0 && updatequery ? UpdateFunctioncall() : joblist;

  function UpdateFunctioncall() {
    const filteredData = joblist.filter((item) => {
      return Object.entries(updatequery).every(([key, value]) => {
        if (Array.isArray(item[key])) {
          return item[key].includes(value);
        } else {
          return item[key] === value;
        }
      });
    });

    return filteredData;
  }

  function handlerClick(props) {
    if (Object.keys(props).length === 0) {
      setSearchParams({});
      setUpdatequery(null);
    } else {
      const keys = Object.keys(props)[0];
      const value = Object.values(props)[0];
      setUpdatequery((prev) => {
        const v = Object.assign(
          {},
          ...Object.entries(prev)
            .filter(([key]) => key !== keys)
            .map(([key, value]) => {
              return {
                [key]: value,
              };
            })
        );

        return v;
      });

      const url = searchParams;
      url.delete(keys, value);
      setSearchParams(url);
    }
  }

  const joblistRender =
    joblist.length > 0 ? (
      filterSearchResult?.map(
        ({
          id,
          logo,
          company,
          position,
          postedAt,
          contract,
          location,
          featured,
          newPost,
          languages,
          level,
          role,
          tools,
        }) => {
          const jobquery = [...languages, ...tools, level, role]
            ?.sort((a, b) => b.length - a.length)
            .map((item, index) => {
              return (
                <button className="job-tag" key={index}>
                  {" "}
                  {item}{" "}
                </button>
              );
            });

          return (
            <div key={id} className="job-card">
              <div className="logo">
                <img src={logo} alt={company} />
              </div>

              <div className="card-details">
                <h2 className="company">{company}</h2>

                {newPost && <h2 className="new-tag">New!</h2>}

                {featured && <h2 className="feature-tag">Featured</h2>}

                {featured && newPost && (
                  <div className="feature-highlight"></div>
                )}

                <h1 className="position">{position}</h1>
                <p className="description">
                  {postedAt} <span> • </span> {contract}
                  <span> • </span>
                  {location}
                </p>
              </div>

              <div className="card-tags">{jobquery}</div>
            </div>
          );
        }
      )
    ) : (
      <h1>Comming...........</h1>
    );

  return (
    <div>
      <div className="header"></div>
      <Container>
        <div className="filters-container">
          <div className="filters">
            <div className="active-filters">
              <h3
                onClick={() => handlerClick({ role: "Frontend" })}
                className="filter-tag">
                Frontend
                <button className="remove-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14">
                    <title>remove filter</title>
                    <path
                      fill="#FFF"
                      d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"></path>
                  </svg>
                </button>
              </h3>

              <h3
                onClick={() => handlerClick({ languages: "JavaScript" })}
                className="filter-tag">
                JavaScript
                <button className="remove-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14">
                    <title>remove filter</title>
                    <path
                      fill="#FFF"
                      d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"></path>
                  </svg>
                </button>
              </h3>
            </div>

            <button className="clear-btn" onClick={() => handlerClick({})}>
              Clear
            </button>
          </div>
        </div>
        <div className="main--job--display">{joblistRender}</div>
      </Container>
    </div>
  );
};

export default JobFindingMainPage;
