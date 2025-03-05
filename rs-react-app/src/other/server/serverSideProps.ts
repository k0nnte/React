import { GetServerSideProps } from 'next';
import { fetchPersonData } from '../fetchData';

export const getServerSideProps: GetServerSideProps = fetchPersonData;
