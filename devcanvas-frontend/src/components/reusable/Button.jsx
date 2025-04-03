function Button({ title }) {
  return <button
          type="submit"
          className="px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-500 hover:text-gray-50 transition ease-linear duration-500"
        >
          {title}
        </button>;
}

export default Button;
