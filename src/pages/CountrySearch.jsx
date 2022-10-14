import {
  Container,
  SearchForm,
  Section,
  Heading,
  Loader,
  CountryList,
} from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/country-service';

export const CountrySearch = () => {
  const [region, setRegion] = useState('');
  const [countries, setCountries] = useState([]);
  const [querySearch, setQuerySearch] = useSearchParams('query');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!region.length) return;

    const fetchCountriesByRegion = async () => {
        setCountries([]);
        setIsLoading(true);
    
      const data = await fetchByRegion(region);
      setCountries(data);
      setIsLoading(false);
    };
    fetchCountriesByRegion();
  }, [region]);

  useEffect(() => {
    setRegion(querySearch.get('query'));
  }, []);

  const onChange = e => {
    setQuerySearch({ query: e.target.value });
  };
  const hendleSubmit = e => {
    e.preventDefault();
    setRegion(querySearch.get('query'));
  };

  return (
    <Section>
      <Container>
        <SearchForm
          onChange={onChange}
          hendleSubmit={hendleSubmit}
          params={querySearch.get('query')}
        />
        {isLoading && <Loader />}
        {countries.length>0 && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};
