import { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react'
import {
    Bars3Icon, XMarkIcon, ShoppingCartIcon, HeartIcon, DevicePhoneMobileIcon,
    ComputerDesktopIcon,
    CodeBracketIcon,
    ShoppingBagIcon,
    HomeIcon,
    SparklesIcon,
    BookOpenIcon,
    PuzzlePieceIcon,
    LifebuoyIcon,
    CakeIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { toast } from 'react-toastify'

import "../../styles/Navbar.css"

import logo from "../../assets/olumsX-transparent.png";

let navigation = []

const categories = [
    { name: 'Mobile Phones', href: '/categorysearch/mobilephones', icon: DevicePhoneMobileIcon },
    { name: 'Laptops and Computers', href: '/categorysearch/laptopsandcomputers', icon: ComputerDesktopIcon },
    { name: 'Tech Accessories', href: '/categorysearch/techaccessories', icon: CodeBracketIcon },
    { name: 'Fashion', href: '/categorysearch/fashion', icon: ShoppingBagIcon },
    { name: 'Home and Decor', href: '/categorysearch/homeanddecor', icon: HomeIcon },
    { name: 'Beauty and Health', href: '/categorysearch/beautyandhealth', icon: SparklesIcon },
    { name: 'Books', href: '/categorysearch/books', icon: BookOpenIcon },
    { name: 'Toys and Games', href: '/categorysearch/toysandgames', icon: PuzzlePieceIcon },
    { name: 'Sports and Outdoors', href: '/categorysearch/sportsandoutdoors', icon: LifebuoyIcon },
    { name: 'Food and Grocery', href: '/categorysearch/foodandgrocery', icon: CakeIcon },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header1({ currentPage }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {

        if (searchTerm.trim()) {
            navigate(`/customer/search/${searchTerm}`);
        } else {
            console.log('Please enter a search term.');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    navigation = navigation.map((item) => ({
        ...item,
        current: item.name === currentPage,
    }));

    const userID = localStorage.getItem("userId");
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/user/getuserbyid', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ UserID: userID })
                });

                if (!response.ok) {
                    throw new Error('Error');
                }

                const data = await response.json();
                setUserName(data.username);

            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        getUserDetails();
    }, [userID]);

    const getInitials = (name) => {
        return name.split(' ').map((n) => n[0]).join('').toUpperCase();
    };

    const navigate = useNavigate();

    const goToWishlist = () => {
        navigate('/customer/wishlist');
    };

    const goToCart = () => {
        navigate('/customer/cart');
    };

    return (
        <Disclosure as="nav" className="bg-black py-1">
            {({ open }) => (
                <>
                    <div className="mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
                        <div className="relative flex justify-between items-center h-16">

                            {/* Mobile menu button*/}
                            <div className="left-0 absolute inset-y-0 flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex relative justify-center items-center hover:bg-gray-700 p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>

                            {/* Left Side - Navbar */}
                            <div className="flex justify-center sm:justify-start items-center sm:items-stretch">
                                {/* Logo */}
                                <div className="flex flex-shrink-0 items-center navbar-logo">
                                    <Link to="/customer">
                                        <img src={logo} alt="logo" style={{ width: '100px', height: 'auto' }} />
                                    </Link>
                                </div>
                            </div>

                            <Popover className="relative">
                                <Popover.Button className="flex items-center gap-x-1 pt-1 font-semibold text-sm text-white leading-6 focus:outline-none">
                                    Categories
                                    <ChevronDownIcon className="flex-none w-5 h-5 text-gray-400" aria-hidden="true" />
                                </Popover.Button>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <Popover.Panel className="top-full -left-8 z-10 absolute bg-white shadow-lg mt-3 rounded-3xl w-72 overflow-hidden ring-1 ring-gray-900/5">
                                        <div className="p-3">
                                            {categories.map((item) => (
                                                <div
                                                    key={item.name}
                                                    className="relative flex items-center gap-x-4 hover:bg-gray-50 p-1 rounded-lg text-sm leading-6 group"
                                                >
                                                    <div className="group-hover:bg-white flex flex-none justify-center items-center bg-gray-50 rounded-lg w-11 h-11">
                                                        <item.icon className="group-hover:text-indigo-600 w-6 h-6 text-gray-600" aria-hidden="true" />
                                                    </div>
                                                    <div className="flex-auto">
                                                        <a href={item.href} className="block font-semibold text-gray-900">
                                                            {item.name}
                                                            <span className="absolute inset-0" />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </Popover>

                            {/* Search Bar */}
                            <div className="flex items-center bg-white px-1 rounded-full w-1/2 text-sm focus-within:outline-blue">
                                <input
                                    type="text"
                                    className="border-0 px-4 py-2.5 rounded-full w-full text-gray-700 text-sm leading-tight focus-outline-none"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <button
                                    className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={handleSearch}
                                >
                                    <MagnifyingGlassIcon className="w-4 h-4" aria-hidden="true" />
                                </button>
                            </div>


                            {/* Right Side - Navbar */}
                            <div className="right-0 sm:static absolute inset-y-0 sm:inset-auto flex items-center sm:ml-6 pr-2 sm:pr-0">
                                {/* Wishlist Icon */}
                                <div className="relative group">
                                    <button
                                        type="button"
                                        onClick={goToWishlist}
                                        className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <HeartIcon className="w-6 h-6" aria-hidden="true" />
                                    </button>
                                    <span className="group-hover:block absolute hidden bg-black mt-2 px-2 py-1 rounded text-white text-xs transform -translate-x-1/2 -translate-y-1/2">
                                        Wishlist
                                    </span>
                                </div>

                                {/* Cart Icon */}
                                <div className="relative group">
                                    <button
                                        type="button"
                                        onClick={goToCart}
                                        className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <ShoppingCartIcon className="w-6 h-6" aria-hidden="true" />
                                    </button>
                                    <span className="group-hover:block absolute hidden bg-black mt-2 px-2 rounded text-white text-xs transform -translate-x-1/4 -translate-y-1/2">
                                        Cart
                                    </span>
                                </div>

                                {/* Profile Dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex bg-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <span className="flex justify-center items-center rounded-full w-8 h-8 font-semibold text-black">
                                                {getInitials(userName)}
                                            </span>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="right-0 z-10 absolute bg-white ring-opacity-5 shadow-lg mt-2 py-1 rounded-md w-48 origin-top-right ring-1 ring-black focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/customer/profile"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>

                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/customer/customerorders"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Orders
                                                    </Link>
                                                )}
                                            </Menu.Item>

                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/customer/chatcustomer"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Chats
                                                    </Link>
                                                )}
                                            </Menu.Item>

                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                    href="/"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    onClick={(e) => {
                                                        console.log("pfft ", localStorage.getItem("user_id"))
                                                        e.preventDefault();
                                                        fetch(`http://localhost:3001/api/session/deletesession`, {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            },
                                                            body: JSON.stringify({userID: localStorage.getItem("user_id")}),
                                                        });

                                                        toast.success("Signed out. See you soon!")
                                                        localStorage.clear();
                                                        // Hard reload to "/" so every section's in-memory state
                                                        // (Redux + cached MUI/Tailwind trees) is cleanly torn down.
                                                        window.location.href = '/';
                                                    }}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>

                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>

                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}