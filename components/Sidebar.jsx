import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    RssIcon,
    HeartIcon,
    PlusCircleIcon
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'

const Sidebar = () => {
    const spotifyApi = useSpotify()
    const { data: session, status } = useSession()
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    console.log(playlistId)

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists()
                .then((data) => {
                    console.log(data)
                    setPlaylists(data.body.items)
                })
        }

    }, [session, spotifyApi]);


    return (
        <div className=" text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen">

            <div className='space-y-4'>
                <button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
                    <p>Log out</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your library</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900" />




                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create playlist</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked songs</p>
                </button>

                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <p>Your episodes</p>
                </button>


                <hr className="border-t-[0.1px] border-gray-900" />

                {
                    playlists.map(pl =>
                        <p onClick={() => setPlaylistId(pl.id)} key={pl.id} className="cursor-pointer hover:text-white">
                            {pl.name}
                        </p>
                    )
                }

            </div>

        </div>
    )
}

export default Sidebar
