import { Grid, GridItem } from 'components';
import { Link, useLocation } from 'react-router-dom';
export const CountryList = ({ countries }) => {
  const location = useLocation();
  if (!countries.length) return;

  return (
    <Grid>
      {countries.map(({ id, flag, country }) => {
        return (
          <GridItem key={id}>
            <Link to={`/country/${id}`} state={{ from: location }}>
              <img src={flag} alt={country} title={country} />
            </Link>
            {/* <p>{country}</p> */}
          </GridItem>
        );
      })}
    </Grid>
  );
};
