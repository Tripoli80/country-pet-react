import { Section, Container, CountryInfo, Loader } from 'components';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from 'service/country-service';

export const Country = e => {
  const [info, setInfo] = useState({});
  const { countryId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      setIsLoading(true);
      const data = await fetchCountry(countryId);
      setInfo(data);
      setIsLoading(false);
    };

    fetchInfo();
  }, [countryId]);

  const { flag, capital, countryName, id, languages = [], population } = info;
  const location = useLocation();
  return (
    <Section>
      <Container>
        <Link to={location.state.from}>Back to products</Link>
        {isLoading && <Loader />}
        {!isLoading && (
          <CountryInfo
            flag={flag}
            capital={capital}
            countryName={countryName}
            id={id}
            languages={languages}
            population={population}
          />
        )}
      </Container>
    </Section>
  );
};
