import { Container, CountryList, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { getCountries } from 'service/country-service';

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setCountries([]);
      setIsLoading(true);
      const data = await getCountries();
      console.log('🚀 ~ data', data);
      setCountries(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        {countries.length>0 &&<CountryList countries={countries} />}
      </Container>
    </Section>
  );
};
