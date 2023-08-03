import "./../JobFinding/Jobfinding.css";
import Container from "react-bootstrap/Container";
import Joblistingdata from "../../../public/data.json";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const JobFindingMainPage = () => {
  const [joblist, setJoblisting] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [updatequery, setUpdatequery] = useState(null);
  const [displaySearch, setDisplaySearch] = useState({});

  useEffect(() => {
    setJoblisting([...Joblistingdata]);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams();

    for (const key in displaySearch) {
      if (Array.isArray(displaySearch[key])) {
        displaySearch[key].forEach((value) => {
          urlParams.append(key, value);
        });
      } else {
        urlParams.set(key, displaySearch[key]);
      }
    }

    const queryString = urlParams.toString();

    setSearchParams(queryString);
    setUpdatequery(Object.assign({}, { ...displaySearch }));
  }, [displaySearch, setSearchParams]);

  const filterSearchResult =
    joblist.length > 0 && updatequery ? UpdateFunctioncall() : joblist;

  function UpdateFunctioncall() {
    const filteredJobs = joblist?.filter((item) => {
      return Object.entries(updatequery).every(([key, values]) => {
        if (Array.isArray(updatequery[key])) {
          return values.every((value) => item[key].includes(value));
        } else if (item[key].includes(values)) {
          return true;
        } else {
          return item[key] === values;
        }
      });
    });

    return filteredJobs;
  }

  function handlerClick(props) {
    const keys = Object.keys(props)[0];
    const valueit = Object.values(props)[0];
    const newAdjustmentobj = { ...displaySearch };

    if (newAdjustmentobj[keys] === valueit) {
      // If the value matches, no need to make changes
    } else if (Array.isArray(newAdjustmentobj[keys])) {
      if (!newAdjustmentobj[keys].includes(valueit)) {
        newAdjustmentobj[keys] = [...newAdjustmentobj[keys], valueit];
      }
    } else if (typeof newAdjustmentobj[keys] === "string") {
      newAdjustmentobj[keys] = [newAdjustmentobj[keys], valueit];
    } else {
      newAdjustmentobj[keys] = valueit;
    }
    setDisplaySearch(newAdjustmentobj);
  }

  function handlerRemove(props) {
    if (Object.keys(props).length === 0) {
      setSearchParams({});
      setUpdatequery(null);
      setDisplaySearch({});
    } else {
      const keysw = Object.keys(props)[0];
      const valueit = Object.values(props)[0];

      const detectdisplaysearch = { ...displaySearch };

      if (Array.isArray(detectdisplaysearch[keysw])) {
        detectdisplaysearch[keysw] = detectdisplaysearch[keysw].filter(
          (item) => item !== valueit
        );
        if (detectdisplaysearch[keysw].length === 0) {
          delete detectdisplaysearch[keysw];
        }
      } else {
        delete detectdisplaysearch[keysw];
      }
      setDisplaySearch(detectdisplaysearch);

      setUpdatequery(detectdisplaysearch);

      const url = searchParams;
      url.delete(keysw, valueit);
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
          const queryObjMaker = Object.entries({
            languages,
            tools,
            level,
            role,
          }).map(([key, value]) => {
            return { [key]: value };
          });

          const filter = Object.entries(queryObjMaker).map(([key, value]) => {
            const keys = Object.keys(value)[0];
            const values = Object.values(value);

            if (typeof values[0] === "string") {
              return (
                <button
                  onClick={() => handlerClick({ [keys]: values[0] })}
                  className={`job-tag ${
                    updatequery &&
                    Object.keys(updatequery).length !== 0 &&
                    updatequery[keys] === values[0]
                      ? "Click-change-color"
                      : ""
                  }`}
                  key={values[0]}>
                  {values[0]}
                </button>
              );
            } else {
              return values[0]?.map((item) => (
                <button
                  onClick={() => handlerClick({ [keys]: item })}
                  className={`job-tag ${
                    updatequery &&
                    updatequery &&
                    Object.keys(updatequery).length !== 0 &&
                    updatequery[keys]?.includes(item)
                      ? "Click-change-color"
                      : ""
                  }`}
                  key={item}>
                  {item}
                </button>
              ));
            }
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

              <div className="card-tags">{filter}</div>
            </div>
          );
        }
      )
    ) : (
      <h1>Comming...........</h1>
    );

  const queryElementRender = Object.entries(displaySearch)?.map(
    ([key, value]) => {
      if (typeof value === "string") {
        return (
          <h3 key={value} className="filter-tag">
            {value}
            <button
              onClick={() => handlerRemove({ [key]: value })}
              className="remove-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                <title>remove filter</title>
                <path
                  fill="#FFF"
                  d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"></path>
              </svg>
            </button>
          </h3>
        );
      } else if (Array.isArray(value)) {
        return value.map((item) => (
          <h3 key={item} className="filter-tag">
            {item}
            <button
              onClick={() => handlerRemove({ [key]: item })}
              className="remove-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                <title>remove filter</title>
                <path
                  fill="#FFF"
                  d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"></path>
              </svg>
            </button>
          </h3>
        ));
      }
    }
  );

  return (
    <div>
      <div className="header"></div>

      <Container>
        {Object.keys(displaySearch).length > 0 && (
          <div className="filters-container">
            <div className="filters">
              <div className="active-filters">{queryElementRender}</div>

              <button className="clear-btn" onClick={() => handlerRemove({})}>
                Clear
              </button>
            </div>
          </div>
        )}

        <div className="main--job--display">{joblistRender}</div>
      </Container>
    </div>
  );
};

export default JobFindingMainPage;
