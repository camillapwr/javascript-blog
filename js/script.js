function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* A.remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* B. add class 'active' to the clicked link */
  
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* C. remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* D. get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* E. find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* F. add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

/*5.4*/

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){

  /* A. remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  /* find all the articles and save them to variable: articles */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  
  let html = '';
  
  for(let article of articles){


    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element and get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into html variable */
    
    html = html + linkHTML; /* ??Naszym celem jest stworzenie zmiennej (nie stałej!) o nazwie html, do której będziemy kolejno doklejać wszystkie linki. Wewnątrz pętli nie będziemy ich dodawać do listy. Dopiero po wykonaniu pętli wstawimy do listy kod HTML wszystkich linków naraz. */

    console.log(html);
  }

  titleList.innerHTML = html;/* ??Zwróć uwagę, że zmienną html musieliśmy zdefiniować poza pętlą for-of. Inaczej ta zmienna istniałaby tylko na czas jednego "obrotu" pętli. Musieliśmy również zadbać o to, aby była to zmienna let, a nie stała const, abyśmy mogli zmieniać jej wartość. */
  
  const links = document.querySelectorAll('.titles a');
  console.log(links);
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

/* 6.2 */

function generateTags(){
  /* A. find all articles *//* B. START LOOP: for every article: */

  const articles = document.querySelectorAll(optArticleSelector);
  
  for(let article of articles){

    /* C. find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* D. make html variable with empty string */

    let html = '';

    /* E. get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* F. split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

      /* G. START LOOP: for each tag */

      for(let tag of articleTagsArray){
        console.log(tag);

        /* H. generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log(linkHTML);

        /* I. add generated code to html variable */
        html = html + linkHTML;
        console.log(html);

        /* J. END LOOP: for each tag */
      }

  /* K. insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /* END LOOP: for every article: */
    }
}

generateTags();

function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* ????make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]'); 
  
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){
    
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* ???execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  /* find all links to tags , nie wiem jaki selektor??*/ 
  const links = document.querySelectorAll('optArticleTagsSelector');

  /* START LOOP: for each link */
  for(let link of links){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();