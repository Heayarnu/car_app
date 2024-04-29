import { FilterProps, carProps } from '@/types';

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, model, fuel, year, limit } = filters;

  const headers: HeadersInit = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&fuel_type=${fuel}&year=${year}&limit=${limit}`,
    {
      headers: headers,
    },
  );

  const result = await response.json();
  console.log(result);

  return result;
}

export function calculateCarRent(
  city_mpg: number,
  highway_mpg: number,
  year: number,
  make: string,
) {
  const basePrice = 100; // base price per day
  const currentYear = new Date().getFullYear();

  const makeFactors = {
    Buick: 1,
    Fiat: 1,
    Kia: 1,
    Mitsubishi: 1,
    Chevrolet: 1.2,
    Ford: 1.2,
    Hyundai: 1.2,
    Mazda: 1.2,
    Subaru: 1.2,
    Volkswagen: 1.2,
    Acura: 1.3,
    Chrysler: 1.3,
    Dodge: 1.3,
    Honda: 1.3,
    Jeep: 1.3,
    MINI: 1.3,
    Nissan: 1.3,
    Toyota: 1.3,
    Audi: 1.4,
    BMW: 1.4,
    Cadillac: 1.4,
    GMC: 1.4,
    Infiniti: 1.4,
    Lexus: 1.4,
    Lincoln: 1.4,
    'Mercedes-Benz': 1.4,
    Ram: 1.4,
    Volvo: 1.4,
    'Alfa Romeo': 1.5,
    Jaguar: 1.5,
    'Land Rover': 1.5,
    Porsche: 1.5,
    Tesla: 1.5,
    'Aston Martin': 1.6,
    Maserati: 1.6,
    'Rolls-Royce': 1.6,
    Ferrari: 1.7,
    Lamborghini: 1.7,
    McLaren: 1.7,
    Bentley: 1.8,
    Bugatti: 1.9,
  };

  let yearFactor = 1;
  if (year >= currentYear - 1) {
    yearFactor = 1.2; // newer cars cost 20% more
  } else if (year >= currentYear - 5) {
    yearFactor = 1.1; // cars up to 5 years old cost 10% more
  }

  let makeFactor: number = makeFactors[make as keyof typeof makeFactors] || 1; // use the make factor if it exists, otherwise default to 1

  let mpgFactor = 1;
  const averageMpg = (city_mpg + highway_mpg) / 2;
  if (averageMpg > 30) {
    mpgFactor = 0.9; // cars with high mpg cost 10% less
  }

  const rent = basePrice * yearFactor * makeFactor * mpgFactor;
  return Math.round(rent);
}

export const generateCarImageUrl = (car: carProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');

  const { make, year, model } = car;

  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split('')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (title: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  // Set or delete the parameter
  if (value) {
    searchParams.set(title, value);
  } else {
    searchParams.delete(title);
  }

  // Define the order of the parameters
  const paramOrder = ['manufacturer', 'model', 'year', 'fuel', 'limit'];

  // Sort the parameters
  const sortedParams = paramOrder.reduce((params, param) => {
    if (searchParams.has(param)) {
      params.set(param, searchParams.get(param) as string);
    }
    return params;
  }, new URLSearchParams());

  const newPathname = `${window.location.pathname}?${sortedParams.toString()}`;

  return newPathname;
};
