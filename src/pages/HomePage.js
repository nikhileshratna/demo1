import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-hot-toast"
import Spinner from "../components/Spinner";
const HomePage = () => {
  const [empData, setEmpData] = useState([]);
  const[loading,setLoading] = useState(false);
  const[checkData, setCheckData] = useState([]);
  
  
  const checkHandler = (person,checked) => {
    if(checked){
      setCheckData([...checkData,person]);
    }else{
      setCheckData(checkData.filter((val) => val._id !== person._id));
    }
  }

  const clickHandler = async() => {
    toast.success("Mail Sent");
    try {
      const getPeople = await fetch(
        `${process.env.REACT_APP_BASE_URL}/mail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checkData),
        }
      )
        console.log(getPeople);
      
      
    } catch (error) {
      console.log(error);
      console.log("Cant send mail")
      toast.error("Cant send mail")
    }
  }

  const deleteHandler = async(person) => {
    setLoading(true);
    try {
      
      const getPeople = await fetch(
        `${process.env.REACT_APP_BASE_URL}/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: person._id }),
        }
      );


      const res = await getPeople?.json();
      setEmpData(res);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }


  const getAllData = async () => {
    try {
      const getPeople = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getallUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await getPeople.json();
      setEmpData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  },[],[empData]);
  console.log(empData);

  // console.log(empData);
  // return (
    
  // )

  return (
    
    <>
    {loading ? <Spinner/> :
      <section className="container px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Hobbies
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              This is a list of all Hobbies. You can add new Hobby, edit
              or delete existing ones.
            </p>
          </div>
          <Link to={"/addemployee"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                Add Hobby
              </button>
            </div>
          </Link>
        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>Name</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Phone Number
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Hobbies
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  
                    {empData?.data?.map((person) => (
                      <tr key={person.name}>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                            <div className="flex gap-2">
                              <input type="checkbox"
                              onChange={(event) => { checkHandler(person,event.target.checked)}}/>
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={person.image}
                                  alt=""
                                />
                                <button 
                                className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500
                                ml-[200px] "
                                onClick={() => { deleteHandler(person)}}
                                >
                                  <Link to={"/editemployee"}>Edit</Link>
                                </button>
                                <button 
                                className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-red-500
                                ml-[10px] "
                                
                                onClick={() => { deleteHandler(person)}}>
                                  <Link to={"/addemployee"}>Delete</Link>
                                </button>
                              </div>
                            </div>
                            <div className="ml-7">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {person.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-300">
                                {person.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white ml-[-10px]">
                            {person.phoneNumber}
                          </div>
                          {/* <div className="text-sm text-gray-500 dark:text-gray-300">
                            {person.hobbies}
                          </div> */}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {person.hobbies}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>}
      <div className="min-w-[100%] mx-auto">
        <button 
        className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 "
        onClick={clickHandler}>
        Send Email
        </button>
      
      </div>
      
                        
      
    </>
  );
};

export default HomePage;
