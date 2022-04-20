import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const savedToken = localStorage.getItem('authToken');

const Name = ({ data, list }) => {
  async function addNameToList(name) {
    console.log('ADDING NAME TO LIST');

    // const [formData, setFormData] = useState({weight: 0});

    try {
      const { status, data } = await axios.post(
        `${API_URL}/lists/${list._id}`,
        {
          name: name._id,
          // TODO remove test value for real one
          weight: 42,
        },
        {
          headers: { Authorization: `Bearer ${savedToken}` },
        }
      );
      console.log('RESULT OF AXIOS', status, data);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        {data.name.value}
        {list?.names.some((item) => item.value === data.name.value) ? (
          'already in list'
        ) : (
        <button onClick={() => addNameToList(data.name)}>ADD</button>
        )}
      </div>
    </>
  );
};

export default Name;

          // <form onSubmit={handleSubmit}>
          //   <label htmlFor='q'>Name</label>
          //   <input
          //     id='q'
          //     type='number'
          //     value={formData.q}
          //     onChange={handleChanges}
          //   />
          //   <input type='submit' value='search' />
          //   <button onClick={() => addNameToList(data.name)}>ADD</button>
          // </form>
