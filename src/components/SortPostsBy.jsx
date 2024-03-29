import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faPlus, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faFire } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";


// filter option on top of posts feed
export default function SortPostsBy({ onSort }) {
    
  return (
    <div className="main-container">
      <div className="sort-container">
        <div className='leftsub'>
          <p>Filter by</p>
        </div>
        <div className='rightnew'>
          <Link className='leftlink' href={"/"} style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faSquarePlus} className="new-post" />
            <span > Subreddit</span>
          </Link>
        </div>
        <div className='rightnew'>
          <Link className='rightlink' href={"/"} style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faFire} className="fire-icon" />  
            <span > New</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

