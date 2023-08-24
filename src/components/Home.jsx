import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from '../images/123.jpg';
import img2 from '../images/456.jpg';
import img3 from '../images/789.jpg';
import profile from '../images/pro_pic.jpg';
import { useSelector } from 'react-redux';
import { Triangle } from "react-loader-spinner";

const Home = () => {
    const [about, setAbout] = useState();
    const [designation, setDesignation] = useState();
    const [awards, setAwards] = useState();
    const [editBio, setEditBio] = useState(null)
    const isLoggedIn = useSelector(state => state.isLoggedIn.value);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        fetchData();
        fetchDesignation();
        fetchAwards();
      }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://port.abirmunna.me/api/v1/about');
            const jsonData = await response.json();
            setAbout(jsonData[0])
        } catch (error) {
            console.log('Error fetching data:', error);
            // setLoading(false);
        }
    };

    const fetchDesignation = async () => {
        try {
            const response = await fetch('https://port.abirmunna.me/api/v1/designation');
            const jsonData = await response.json();
            setDesignation(jsonData)
        } catch (error) {
            console.log('Error fetching data:', error);
            // setLoading(false);
        }
    };
    
    const fetchAwards = async () => {
        try {
            const response = await fetch('https://port.abirmunna.me/api/v1/awards');
            const jsonData = await response.json();
            setAwards(jsonData)
            setLoading(false);
        } catch (error) {
            console.log('Error fetching data:', error);
            // setLoading(false);
        }
    };

    //---------------------------Image edit functionality-------------------------------
    const [imageEditing, setImageEditing] = useState(false);
    const [image, setImage] = useState();

    const handleSaveImage = () => {
        //api call
        console.log(image)
        setImage(null)
        imageEditing(false)
    }

    //--------------------------Bio editing functionality-------------------------------
    const [isBioEditing, setIsBioEditing] = useState(false);
    const [bio, setBio] = useState(null);

    const handleSaveBio = () => {
        if(bio && bio.id !== undefined) {
            const updateData = async () => {
                try {
                    const response = await fetch('https://port.abirmunna.me/api/v1/designation', {
                        method: 'PUT',
                        headers: {
                        'Content-Type': 'application/json',    
                        },
                        body: JSON.stringify({
                            "location": bio?.location,
                            "id": bio?.id,
                            "name": bio?.name,
                            "company": bio?.company
                        },
                        null,
                        2
                        ),
                    });
                    
                    if (response.ok) {
                        fetchDesignation();
                        setBio(null);
                        console.log('Data updated successfully');
                    } else {
                        console.log('Error updating data');
                    }
                } catch (error) {
                    console.log('Error updating data:', error);
                }
            };
            updateData();
        }
        else{
            const updateData = async () => {
                try {
                    const response = await fetch('https://port.abirmunna.me/api/v1/designation', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "location": bio?.location || "",
                            "name": bio?.name,
                            "company": bio?.company || ""
                        },
                        null,
                        2
                        ),
                    });
                    
                    if (response.ok) {
                        fetchDesignation();
                        setBio(null);
                        console.log('Data updated successfully');
                    } else {
                        console.log('Error updating data');
                    }
                } catch (error) {
                    console.log('Error updating data:', error);
                }
            };
            updateData();
        }

        setIsBioEditing(false)
    }

    const handleBioUpdateButton = (id, name, company, location) => {
        setBio((prevBio) => ({ ...prevBio, id, name, company, location }));
        setIsBioEditing(true)
    }

    const handleBioDelete = (id) => {
        const deleteDesignation = async () => {
            try {
                const response = await fetch(`https://port.abirmunna.me/api/v1/designation?id=${id}`, {
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    fetchDesignation();
                    console.log('Data deleted successfully');
                } else {
                    console.log('Error updating data');
                }
            } catch (error) {
                console.log('Error updating data:', error);
            }
        };
        deleteDesignation();
    }

    //---------------------------Image editing functionality---------------------------

    const handleCarouselImage = () => {

    }

    //-------------------------Award editing functionality----------------------------
    const [isAwardEditing, setIsAwardEditing] = useState(false);
    const [award, setAward] = useState(null);

    const handleUpdateAward = (id, title, year) => {
        setAward((prevAward) => ({ ...prevAward, id, title, year }));
        setIsAwardEditing(true)
    }

    const handleSaveAward = () => {
        if(award && award.id !== undefined) {
            const updateAward = async () => {
                try {
                    const response = await fetch('https://port.abirmunna.me/api/v1/awards', {
                        method: 'PUT',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "title": award?.title,
                            "year": award?.year,
                            "id": award?.id
                        },
                        null,
                        2
                        ),
                    });
                    
                    if (response.ok) {
                        fetchAwards();
                        setAward(null);
                        console.log('Data updated successfully');
                    } else {
                        console.log('Error updating data');
                    }
                } catch (error) {
                    console.log('Error updating data:', error);
                }
            };
            updateAward();
        }
        else{
            const updateAward = async () => {
                try {
                    const response = await fetch('https://port.abirmunna.me/api/v1/awards', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "title": award?.title || "",
                            "year": award?.year || ""
                        },
                        null,
                        2
                        ),
                    });
                    
                    if (response.ok) {
                        fetchAwards();
                        setAward(null);
                        console.log('Data updated successfully');
                    } else {
                        console.log('Error updating data');
                    }
                } catch (error) {
                    console.log('Error updating data:', error);
                }
            };
            updateAward();
        }
        setIsAwardEditing(false)
    }

    const handleDeleteAward = (id) => {
        const deleteAward = async () => {
            try {
                const response = await fetch(`https://port.abirmunna.me/api/v1/awards?id=${id}`, {
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    fetchAwards();
                    console.log('Data deleted successfully');
                } else {
                    console.log('Error updating data');
                }
            } catch (error) {
                console.log('Error updating data:', error);
            }
        };
        deleteAward();
    }

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 3000);

        return () => {
        clearInterval(timer);
        };
    }, []);

    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setEditBio(about.bio)
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        const updateData = async () => {
            try {
                const response = await fetch('https://port.abirmunna.me/api/v1/about', {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "id": 1,
                        "name": about?.name,
                        "motto": about?.motto,
                        "bio": editBio
                    },
                    null,
                    2
                    ),
                });
                
                if (response.ok) {
                    fetchData();
                    setEditBio(null)
                    console.log('Data updated successfully');
                } else {
                    console.log('Error updating data');
                }
            } catch (error) {
                console.log('Error updating data:', error);
            }
        };
    
        updateData();
        setIsEditing(false);
    };

    const handleChange = (event) => {
        setEditBio(event.target.value);
    };
    const handleCancelClick = () => {
        setEditBio(null)
        setIsEditing(false);
    }

    if(loading) return (
        <div className="fixed top-0 left-0 flex justify-center items-center h-full w-screen">
        <Triangle
          height="60"
          width="60"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    )

    return (
        <div className='mt-4 md:mx-24 mx-4'>
            {imageEditing && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-10 flex justify-center items-center">
                    <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
                        <input type="file" onChange={e => setImage(e.target.value)}/>
                        <div className="flex justify-center gap-4">
                            <button className="bg-blue-400 rounded px-4 py-1 text-white hover:bg-blue-500" onClick={handleSaveImage}>
                                Save
                            </button>
                            <button className="bg-red-400 rounded px-4 py-1 text-white hover:bg-red-500" onClick={() => setImageEditing(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isBioEditing && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-10 flex justify-center items-center">
                    <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
                        <div className='space-y-2'>
                            <div className="flex">
                                <p className='w-20'>Title</p>
                                <input className='px-2 border rounded flex-1' type="text" onChange={e => setBio({...bio, name: e.target.value})}  placeholder='Title' value={bio?.name}/>
                            </div>
                            <div className="flex">
                                <p className='w-20'>Company</p>
                                <input className='px-2 border rounded flex-1' type="text" onChange={e => setBio({...bio, company: e.target.value})}  placeholder='Company' value={bio?.company}/>
                            </div>
                            <div className="flex">
                                <p className='w-20'>Locaton</p>
                                <input className='px-2 border rounded flex-1' type="text" onChange={e => setBio({...bio, location: e.target.value})}  placeholder='Locaton' value={bio?.location}/>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4">
                            <button className="save" onClick={handleSaveBio}>
                                Save
                            </button>
                            <button className="cancel" onClick={() => {setIsBioEditing(false); setBio(null)}}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isAwardEditing && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-10 flex justify-center items-center">
                    <div className="w-96 h-fit p-4 bg-white text-black rounded space-y-4">
                        <div className='space-y-2'>
                            <div className="flex">
                                <p className='w-16'>Image: </p>
                                <input type="file" onChange={e => setAward({...award, image: e.target.value})}  value={award?.image}/>
                            </div>
                            <div className="flex">
                                <p className='w-16'>Title</p>
                                <input className='px-2 border rounded flex-1' type="text" onChange={e => setAward({...award, title: e.target.value})}  placeholder='Title' value={award?.title}/>
                            </div>
                            <div className="flex">
                                <p className='w-16'>Year</p>
                                <input className='px-2 border rounded flex-1' type="text" onChange={e => setAward({...award, year: e.target.value})}  placeholder='Year' value={award?.year}/>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4">
                            <button className="save" onClick={handleSaveAward}>
                                Save
                            </button>
                            <button className="cancel" onClick={() => {setIsAwardEditing(false); setBio(null)}}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="sm:flex gap-2">
                <div className="flex flex-col items-center sm:w-1/3 w-full p-2 gap-2">
                    <div className="max-w-full w-56 h-64">
                        <img src={profile} alt="profile" className="w-full h-full object-cover"/>
                    </div>
                    {isLoggedIn && <div onClick={() => setImageEditing(true)} className="fas fa-edit cursor-pointer scale-110 text-green-500"></div>}
                    <div className='text-center'><p className='font-bold text-xl'>{about?.name}</p>
                        {
                            designation?.map((d, index) => (
                                <div key={d.name}>
                                    <div className='my-3'>
                                        <p className='font-semibold'>{d.name}</p>
                                        <p>{d.company}</p>
                                        <p>{d.location}</p>
                                    </div>
                                    {isLoggedIn && (
                                    <div className="flex justify-center gap-4">
                                        <button className="fas fa-edit text-green-500" onClick={() => handleBioUpdateButton(d.id, d.name, d.company, d.location)}></button>
                                        <button className="fas fa-trash text-red-400" onClick={() => handleBioDelete(d.id)}></button>
                                    </div>)}
                                </div>
                            ))
                        }
                    </div>
                    {isLoggedIn && <button onClick={() => setIsBioEditing(true)} className="edit">ADD</button>}
                </div>

                <div className="flex-1">
                {isEditing ? (
                    <div className='w-full'>
                        <textarea value={editBio} onChange={handleChange} className="text-justify mb-4 w-full h-96 outline-none"/>
                        <button className='border px-4 py-1 mb-4 rounded mr-4' onClick={handleSaveClick}>Save</button>
                        <button className='border px-4 py-1 mb-4 rounded' onClick={handleCancelClick}>Cancel</button>
                    </div>
                    ) : (
                        <div>
                            <p className="text-justify mb-4">{about?.bio}</p>
                            {isLoggedIn && <button className='border px-4 py-1 mb-4 rounded' onClick={handleEditClick}>Edit</button>}
                        </div>
                    )}
                    <Carousel selectedItem={activeIndex} onChange={setActiveIndex}>
                        <div>
                            <img src={img1} alt="Image 1" />
                            {/* <p className="legend">Caption 1</p> */}
                        </div>
                        <div>
                            <img src={img2} alt="Image 2" />
                            {/* <p className="legend">Caption 2</p> */}
                        </div>
                        <div>
                            <img src={img3} alt="Image 3" />
                            {/* <p className="legend">Caption 3</p> */}
                        </div>
                    </Carousel>
                    <div>
                        <div className="flex">

                        </div>
                    </div>
                    {isLoggedIn && <button onClick={handleCarouselImage} className="edit">ADD</button>}
                </div>
            </div>
            <div>
                <p className='w-full text-center py-1 bg-indigo-950 text-white font-semibold mt-4'>Awards</p>
                {
                    awards?.map(a=> (
                        <div className="flex gap-2 p-2 border rounded my-2 shadow h-fit" key={a.title}>
                            <div className="w-28 h-20">
                                <img src="" alt="" className="w-full h-full object-fit" />
                            </div>
                            <div className='flex-1'>
                                <p className="font-semibold text-md">{a.title}</p>
                                <p>{a.year}</p>
                            </div>
                            {isLoggedIn && (
                                <div className="flex gap-4 h-fit my-auto">
                                    <button className="fas fa-edit text-green-500" onClick={() => handleUpdateAward(a.id, a.title, a.year)}></button>
                                    <button className="fas fa-trash text-red-400" onClick={() => handleDeleteAward(a.id)}></button>
                                </div>
                            )}
                        </div>
                    ))
                }
                {isLoggedIn && (
                    <button onClick={() => setIsAwardEditing(true)} className="edit">ADD</button>
                )}
            </div>
        </div>
    );
}

export default Home;