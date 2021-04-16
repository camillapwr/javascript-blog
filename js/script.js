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
  optArticleTagsSelector = '.post-tags .list',
  optTagsListSelector = '.tags.list',/*skąd taka nazwa????*/
  optArticleAuthorSelector = '.post-author',
  optAuthorsListSelector = '.authors.list',
  optCloudClassCount = 4,
  optCloudClassPrefix = 'tag-size-';


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

/*6.3 ////////////////////////////////////////////// add NEW function to change tag list in tag cloud  */      

function calculateTagsParams(tags){
  
  const params = {
    max: 0,
    min: 999999
  };

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');

    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}

function calculateTagsClass(count, params){

  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;


}

/* 6.2 //////////////////////////////////////////GENERATE TAGS*/

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* A. find all articles *//* B. START LOOP: for every article: */

  const articles = document.querySelectorAll(optArticleSelector);
  
  for(let article of articles){

    /* C. find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper); /*wyszykuje miejsce w artykule dla listy tagow, wrappera w ktorym jest juz ul i zostanie za chwile stworzona lista tagow li, na dole kazdego wyswietlanego artykulu*/

    /* D. make html variable with empty string */

    let html = '';
    
    /* E. get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);//funcja wydobyla wszystkie slowa kluczowe(tagi) z kazdego artykulu

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
  

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      console.log(allTags[tag]);

      /* J. END LOOP: for each tag */
    }

    /* K. insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log(tagsWrapper);/* wklejamy nowoutworzony kod HTML do wczesniej przydotowanego wrapera */
  
    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  console.log(tagList);

  /* [NEW] add this to change tag list in tag cloud */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';
  
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    /* [NEW]/?????NEW CHANGE generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = calculateTagsClass(allTags[tag], tagsParams);
    console.log('tagLinkHTML:' , tagLinkHTML);

    allTagsHTML += '<li><a href="#tag-' + tag + '" class ="' + tagLinkHTML + '">' + tag + '</a> ' + allTags[tag] + '</li>';
    console.log(allTagsHTML);


  /* [NEW] END LOOP: for each tag in allTags: */
  }
  /* [NEW] add html from allTagsHTML to tagList*/
  tagList.innerHTML = allTagsHTML;
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

function generateAuthors(){
  /*find all articles and start loop for every article*/
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){

    /* find author wrapper(list)*/
    const authorList = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */
    let html = '';
    /* get authot from data-author */
    const articleAuthor = article.getAttribute('data-author');
    /* generate HTML of the link */
    const linkHTML = '<li><a href = "#author-' + articleAuthor + '"<span>' + articleAuthor + '</span></a></li>';
    /*add generated html code to html variable */
    html = html + linkHTML;

    /*insert HTML of all the links into the authorList */
    authorList.innerHTML = html;
    /*END LOOP */
  }
}
generateAuthors();


function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Author was clicked');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* ????make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]'); 
  
  /* START LOOP: for each active author link */
  for(let activeAuthor of activeAuthors){

    /* remove class active */
    activeAuthor.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  
  /* START LOOP: for each found author link */
  for(let authorLink of authorLinks){
    
    /* add class active */
    authorLink.classList.add('active');

  /* END LOOP: for each found author link */
  }
  /* ???execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}



function addClickListenersToAuthors(){
  /* find all links to authors , nie wiem jaki selektor??*/ 
  const links = document.querySelectorAll('optArticleAuthorSelector');

  /* START LOOP: for each link */
  for(let link of links){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
