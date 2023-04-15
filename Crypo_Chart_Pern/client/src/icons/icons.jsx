export const TempIcon = () => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className=' w-20 h-20'
  >
    <path
      d='M13.52 13.67C13.25 14.76 11.42 14.17 10.82 14.02L11.3 12.09C11.9 12.24 13.8 12.53 13.52 13.67ZM11.96 9.45003L11.52 11.2C12.02 11.32 13.55 11.83 13.8 10.84C14.05 9.81003 12.46 9.57003 11.96 9.45003ZM19.76 13.93C18.69 18.21 14.35 20.82 10.06 19.76C5.78 18.69 3.16 14.35 4.23 10.07C5.3 5.78003 9.64 3.18003 13.93 4.24003C18.21 5.31003 20.83 9.65003 19.76 13.93ZM9.37 13.34C9.33 13.45 9.22 13.61 8.97 13.55C8.93 13.55 8.33 13.39 8.33 13.39L7.89 14.39L9.03 14.67C9.25 14.73 9.45 14.78 9.66 14.84L9.3 16.29L10.17 16.51L10.53 15.07C10.77 15.14 11 15.19 11.23 15.25L10.87 16.68L11.75 16.9L12.11 15.45C13.61 15.73 14.74 15.62 15.21 14.26C15.59 13.17 15.19 12.54 14.4 12.13C14.97 12 15.4 11.62 15.52 10.84C15.68 9.78003 14.87 9.20003 13.76 8.83003L14.12 7.38003L13.24 7.16003L12.89 8.56003C12.66 8.50003 12.42 8.45003 12.18 8.39003L12.53 6.98003L11.66 6.76003L11.3 8.20003C11.11 8.16003 10.92 8.11003 10.74 8.07003L9.53 7.76003L9.3 8.70003C9.3 8.70003 9.94 8.85003 9.94 8.86003C10.29 8.95003 10.35 9.18003 10.35 9.37003L9.36 13.32L9.37 13.34Z'
      fill='#F7931A'
    />
  </svg>
);

export const SearchIcon = () => (
  <svg
    width='800px'
    height='800px'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5 absolute left-2'
  >
    <path
      d='M15 15L21 21'
      stroke='#fff'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z'
      stroke='#fff'
      strokeWidth='2'
    />
  </svg>
);

export const StarIcon = ({ fill }) => (
  <svg
    width='800px'
    height='800px'
    viewBox='0 0 24 24'
    fill={fill ? '#FFC600' : 'none'}
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6'
  >
    <g id='Interface / Star'>
      <path
        id='Vector'
        d='M2.33496 10.3368C2.02171 10.0471 2.19187 9.52339 2.61557 9.47316L8.61914 8.76107C8.79182 8.74059 8.94181 8.63215 9.01465 8.47425L11.5469 2.98446C11.7256 2.59703 12.2764 2.59695 12.4551 2.98439L14.9873 8.47413C15.0601 8.63204 15.2092 8.74077 15.3818 8.76124L21.3857 9.47316C21.8094 9.52339 21.9791 10.0472 21.6659 10.3369L17.2278 14.4419C17.1001 14.56 17.0433 14.7357 17.0771 14.9063L18.255 20.8359C18.3382 21.2544 17.8928 21.5787 17.5205 21.3703L12.2451 18.4166C12.0934 18.3317 11.9091 18.3321 11.7573 18.417L6.48144 21.3695C6.10913 21.5779 5.66294 21.2544 5.74609 20.8359L6.92414 14.9066C6.95803 14.7361 6.90134 14.5599 6.77367 14.4419L2.33496 10.3368Z'
        stroke='#FFC600'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  </svg>
);

export const Hamburger = () => (
  <svg
    className='w-12 h-12'
    viewBox='0 0 24 24'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    xmlns:xlink='http://www.w3.org/1999/xlink'
  >
    <title>Menu</title>
    <g
      id='Page-1'
      stroke='none'
      strokeWidth='1'
      fill='none'
      fill-rule='evenodd'
    >
      <g id='Menu'>
        <rect
          id='Rectangle'
          fill-rule='nonzero'
          x='0'
          y='0'
          width='24'
          height='24'
        ></rect>
        <line
          x1='5'
          y1='7'
          x2='19'
          y2='7'
          id='Path'
          stroke='#fff'
          strokeWidth='2'
          strokeLinecap='round'
        ></line>
        <line
          x1='5'
          y1='17'
          x2='19'
          y2='17'
          id='Path'
          stroke='#fff'
          strokeWidth='2'
          strokeLinecap='round'
        ></line>
        <line
          x1='5'
          y1='12'
          x2='19'
          y2='12'
          id='Path'
          stroke='#fff'
          strokeWidth='2'
          strokeLinecap='round'
        ></line>
      </g>
    </g>
  </svg>
);
