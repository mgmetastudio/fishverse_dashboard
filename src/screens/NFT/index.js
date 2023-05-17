import { useState } from "react";
import cn from "classnames";
import styles from "./nft.module.sass";
import Card from "../../components/Card";
import Title from "../../components/Title"
import { useRecoilValueLoadable } from "recoil";
import { walletState } from "../../atoms";
import { paginationArrow } from "../../constants/svg";


const OwnedNfts = () => {
  let wallet = []
  let walletLoadable = useRecoilValueLoadable(walletState);
  if (walletLoadable.state === 'hasValue') {
    wallet = walletLoadable.contents;
  } else if (walletLoadable.state === 'hasError') {
    console.log("Got recoil walletState error", walletLoadable);
  }

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  const filterItems = (category) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  const switchPage = (number) => {
    if (number > 0 && number <= pageNumbers.slice(-1)) {
      setCurrentPage(number)
    }
  };

  const categories = ["Rods", "Mix", "Season pass", "Boat", "Reel", "Equipment"]
  const categoryTabs = categories.map((category) => {
    return (
      <li className={categoryFilter === category ? styles.activeTab : ""} onClick={() => filterItems(category)}>
        {category} ({wallet.filter(x => x.category === category).length})
      </li>
    )
  })

  let walletItems = [];
  if (categoryFilter != 'all') {
    walletItems = wallet.filter(item => item.category == categoryFilter).map((x, index) => (<Card className={styles.card} item={x} key={index} walletIndex={index} />))
  } else {
    walletItems = wallet.map((x, index) => (<Card className={styles.card} item={x} key={index} walletIndex={index} />))
  }

  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentItems = walletItems.length != 0 ? walletItems.slice(indexOfFirstItem, indexOfLastItem) : <div className={styles.loaderContainer} >You do not own any FishVerse NFT of {categoryFilter} category.</div>;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(walletItems.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <Title>My NFT collection</Title>
        <ul className={cn(styles.tabsHeader)}>
          {categoryTabs}
          <li className={categoryFilter === "all" ? styles.activeTab : ""} onClick={() => filterItems("all")}>
            All ({wallet.length})
          </li>
        </ul>
        <div className={styles.list}>
          {walletLoadable.state === 'loading' ? <div className={styles.loaderContainer} >Loading wallet...</div> : currentItems}
          {walletLoadable.state === 'hasError' ? <div className={styles.loaderContainer} >An error occured. Try again later.</div> : null}
        </div>
        {walletItems.length > postsPerPage ?
          <div className={styles.pagination}>
            <span className={styles.arrowBack} onClick={() => switchPage(currentPage - 1)}>{paginationArrow}</span>
            <div><span className={styles.currentPage}>
              {currentPage}
            </span> of <span className={styles.pageNumbers}>{pageNumbers.slice(-1)}</span></div>
            <span className={styles.arrowForward} onClick={() => switchPage(currentPage + 1)}>{paginationArrow}</span>
          </div>
          : null
        }
      </div>
    </div>
  );
};

export default OwnedNfts;
