const express = require("express");
const cors = require("cors");
const { response } = require("express");

//Users
const users = [{
    userID: 1,
    userName: "Gustavo",
    userLastname: "Rodriguez",
    email: "Pablo@gmail.com",
    avatarURL: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
}, ];
//Books
const books = [{
        id: 1,
        bookBackgroundImageURL: "/images/catalog/bookcover1.jpg",
        bookTitle: "A Game of Thrones",
        bookDescription: "A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by the American author George R. R. Martin.",
        bookFullDescription: "A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by the American author George R. R. Martin.\nThe first volume of A Song of Ice and Fire, the greatest fantasy epic of the modern age. GAME OF THRONES is now a major TV series from HBO, starring Sean Bean.\n Summers span decades. Winter can last a lifetime. And the struggle for the Iron Throne has begun.\n As Warden of the North, Lord Eddard Stark counts it a curse when King Robert bestows on him the office of the Hand. His honour weighs him down at court where a true man does what he will, not what he must … and a dead enemy is a thing of beauty.\n The old gods have no power in the south, Stark's family is split and there is treachery at court. Worse, the vengeance-mad heir of the deposed Dragon King has grown to maturity in exile in the Free Cities. He claims the Iron Throne.",
        bookAuthor: "George R.R. Martin",
        bookCategory: "Fantasy",
    },
    {
        id: 2,
        bookBackgroundImageURL: "/images/catalog/bookcover2.jpg",
        bookTitle: "The Wise Man's Fear",
        bookDescription: "In The Wise Man's Fear, Kvothe searches for answers, attempting to uncover the truth about the mysterious Amyr, the Chandrian.",
        bookFullDescription: "In The Wise Man's Fear, Kvothe searches for answers, attempting to uncover the truth about the mysterious Amyr, the Chandrian.\nOn the second day of his recounting the story of his life to Chronicler at the Waystone Inn, Kvothe continues the narrative commenced in The Name of the Wind, wherein a younger Kvothe pursues his education at the University.\n There, he carries on a feud with fellow student Ambrose, culminating in Ambrose getting him brought up on charges of Consortation with Demonic Powers, a capital crime, for having called the Name of the Wind.\n Despite successfully defending himself in court, Kvothe has guaranteed himself an extremely high term tuition due to the negative attention he has attracted at the University.\n Kvothe follows the advice of his friends and teachers at the University and decides to take a term off to chase the wind. To postpone having to pay his debt to the loan shark Devi, he uses several of his more prized possessions as collateral before setting off.",
        bookAuthor: "Patrick Rothfuss",
        bookCategory: "Fantasy",
    },
    {
        id: 3,
        bookBackgroundImageURL: "/images/catalog/bookcover3.jpg",
        bookTitle: "The Return of the King",
        bookDescription: "The Return of the King is the third and final volume of J.R.R. Tolkien's The Lord of the Rings, following The Fellowship of the Ring and The Two Towers. The Return of the King was originally released on October 20, 1955 in the United Kingdom.",
        bookFullDescription: "he Return of the King is the third and final volume of J.R.R. Tolkien's The Lord of the Rings, following The Fellowship of the Ring and The Two Towers. The Return of the King was originally released on October 20, 1955 in the United Kingdom.\nThe Return of the King is the third and final volume of J.R.R. Tolkien's The Lord of the Rings, following The Fellowship of the Ring and The Two Towers. The Return of the King was originally released on October 20, 1955 in the United Kingdom.\n The story begins as Pippin is in Rohan, reunited with the remnants of the Fellowship of the Ring. He steals Saruman's palantír and sees that Sauron will attack Minas Tirith. Then Gandalf delivers news to the steward of Gondor that war is imminent.\n  Gandalf brings Pippin with him, who enters the service of the steward. Aragorn by his courage and leadership proves himself a worthy ruler of men. He is destined to find a lost army of men now dead yet entrapped in a curse set forth long ago by their own disobedience, in the place known as the paths of the dead. The remnants of the Fellowship lead the forces of Gondor and Rohan in defence of Gondor's capital city, Minas Tirith, resulting in the cataclysmic Battle of the Pelennor Fields.\n Those characters that manage to survive the battle are led by Aragorn on a assuredly suicidal feint-attack against the Black Gates of Mordor, partly to distract Sauron from defending his other borders so that Frodo and Sam can gain a clear passage into Mordor. Aragorn's company now surrounds the Black Gates of the Morannon exchanging idle words with the Mouth of Sauron.",
        bookAuthor: "J.R.R Tolkien",
        bookCategory: "Fantasy",
    },
    {
        id: 4,
        bookBackgroundImageURL: "/images/catalog/bookcover4.jpg",
        bookTitle: "A Quest of Heroes",
        bookDescription: "A Quest for Heroes revolves around the epic coming of age story of one special boy, a 14 year old from a small village on the outskirts.",
        bookFullDescription: "A Quest for Heroes revolves around the epic coming of age story of one special boy, a 14 year old from a small village on the outskirts.\nFrom #1 Bestselling author Morgan Rice comes the debut of a dazzling new fantasy series. A Quest for Heroes revolves around the epic coming of age story of one special boy, a 14 year old from a small village on the outskirts of the Kingdom of the Ring. The youngest of four, the least favorite of his father, hated by his brothers, Thorgrin senses he is different from the others. He dreams of becoming a great warrior, of joining the King's men and protecting the Ring from the hordes of creatures on the other side of the Canyon. When he comes of age and is forbidden by his father to try out for the King's Legion, he refuses to take no for an answer: he journeys out on his own, determined to force his way into King's Court and be taken seriously.\n But King's Court is rife with its own family dramas, power struggles, ambitions, jealousy, violence and betrayal. King MacGil must choose an heir from amongst his children, and the ancient Dynasty Sword, the source of all their power, still sits untouched, waiting for the chosen one to arrive. Thorgrin arrives as an outsider and battles to be accepted, and to join the King's Legion.",
        bookAuthor: "Morgan Rice",
        bookCategory: "Fantasy",
    },
    {
        id: 5,
        bookBackgroundImageURL: "/images/catalog/bookcover5.jpg",
        bookTitle: "It",
        bookDescription: "The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise",
        bookFullDescription: "The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise.\nIt is a 1986 horror novel by American author Stephen King. It was his 22nd book and his 17th novel written under his own name. The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise itself while hunting its prey. 'It' primarily appears in the form of Pennywise the Dancing Clown to attract its preferred prey of young children.\nThe novel is told through narratives alternating between two periods and is largely told in the third-person omniscient mode. It deals with themes that eventually became King staples: the power of memory, childhood trauma and its recurrent echoes in adulthood, the malevolence lurking beneath the idyllic façade of the American small town, and overcoming evil through mutual trust and sacrifice.\nKing has stated that he first conceived the story in 1978, and began writing it in 1981. He finished writing the book in 1985. He also stated that he originally wanted the title character to be a troll like the one in the children's story 'Three Billy Goats Gruff', but who inhabited the local sewer system rather than just the area beneath one bridge. He also wanted the story to interweave the stories of children and the adults they later become.\nThe novel won the British Fantasy Award in 1987, and received nominations for the Locus and World Fantasy Awards that same year. Publishers Weekly listed It as the best-selling hardcover fiction book in the United States in 1986.] It has been adapted into a 1990 two-part miniseries directed by Tommy Lee Wallace, a Hindi 1998 television series directed by Glen Baretto & Ankush Mohla, and into a film duology directed by Andy Muschietti; It was released in September 2017 and It Chapter Two was released in September 2019.",
        bookAuthor: "Stephen King",
        bookCategory: "Horror",
    },
    {
        id: 6,
        bookBackgroundImageURL: "/images/catalog/bookcover6.jpg",
        bookTitle: "The Little Prince",
        bookDescription: "The story follows a young prince who visits various planets in space, including Earth, and addresses themes of loneliness, friendship, love.",
        bookFullDescription: "The story follows a young prince who visits various planets in space, including Earth, and addresses themes of loneliness, friendship, love.\nA pilot crashes in the Sahara Desert and encounters a strange young boy who calls himself the Little Prince. The Little Prince has traveled there from his home on a lonely, distant asteroid with a single rose. The story that follows is a beautiful and at times heartbreaking meditation on human nature.\nThe Little Prince is one of the best-selling and most translated books of all time, universally cherished by children and adults alike, and Richard Howard's translation of the beloved classic beautifully reflects Saint-Exupéry's unique and gifted style, bringing the English text as close as possible to the French in language, style, and spirit. In this special edition, the artwork has been restored to match in detail and in color Saint-Exupéry's original artwork.\nThis definitive English-language edition of The Little Prince will capture the hearts of readers of all ages.",
        bookAuthor: "Antoine de Saint-Exupery",
        bookCategory: "Classic",
    },
    {
        id: 7,
        bookBackgroundImageURL: "/images/catalog/bookcover7.jpg",
        bookTitle: "range of ghosts",
        bookDescription: "A powerful new fantasy from Hugo award-winning author Elizabeth Bear, Range of Ghosts creates a world both deep and broad, where a sorcerer-prince.",
        bookFullDescription: "A powerful new fantasy from Hugo award-winning author Elizabeth Bear, Range of Ghosts creates a world both deep and broad, where a sorcerer-prince.\nTemur, grandson of the Great Khan, is walking away from a battlefield where he was left for dead. All around lie the fallen armies of his cousin and his brother, who made war to rule the Khaganate. Temur is now the legitimate heir by blood to his grandfather's throne, but he is not the strongest. Going into exile is the only way to survive his ruthless cousin.\nOnce-Princess Samarkar is climbing the thousand steps of the Citadel of the Wizards of Tsarepheth. She was heir to the Rasan Empire until her father got a son on a new wife. Then she was sent to be the wife of a Prince in Song, but that marriage ended in battle and blood. Now she has renounced her worldly power to seek the magical power of the wizards.\nThese two will come together to stand against the hidden cult that has so carefully brought all the empires of the Celadon Highway to strife and civil war through guile and deceit and sorcerous power.",
        bookAuthor: "elizabeth bear",
        bookCategory: "Fantasy",
    },
    {
        id: 8,
        bookBackgroundImageURL: "/images/catalog/bookcover8.jpg",
        bookTitle: "Temeraire",
        bookDescription: "The novels follow the adventures of Captain William Laurence and his dragon, the eponymous Temeraire, and reimagine events of the Napoleonic Wars with.",
        bookFullDescription: "The novels follow the adventures of Captain William Laurence and his dragon, the eponymous Temeraire, and reimagine events of the Napoleonic Wars with.\nAerial combat brings a thrilling new dimension to the Napoleonic Wars as valiant warriors rise to Britain’s defense by taking to the skies . . . not aboard aircraft but atop the mighty backs of fighting dragons.\nWhen HMS Reliant captures a French frigate and seizes its precious cargo, an unhatched dragon egg, fate sweeps Capt. Will Laurence from his seafaring life into an uncertain future–and an unexpected kinship with a most extraordinary creature. Thrust into the rarified world of the Aerial Corps as master of the dragon Temeraire, he will face a crash course in the daring tactics of airborne battle. For as France’s own dragon-borne forces rally to breach British soil in Bonaparte’s boldest gambit, Laurence and Temeraire must soar into their own baptism of fire.",
        bookAuthor: "Naomi Novik",
        bookCategory: "Fantasy",
    },
    {
        id: 9,
        bookBackgroundImageURL: "/images/catalog/bookcover9.jpg",
        bookTitle: "The Notebook",
        bookDescription: "This was Nicholas Sparks' first published novel. It was the third written after The Passing and The Royal Murders, which he did not publish. He wrote it over a period of six months in 1994. Literary agent Theresa Park discovered Sparks by picking the book out of her agency's slush pile and reading it. Park offered to represent him. In October 1995, Park secured a $1 million advance for the book from the Time Warner Book Group, and the novel was published in October 1996. It was on The New York Times Best Seller list in its first week of release. The Notebook was a hardcover best seller for more than a year.",
        bookFullDescription: "This was Nicholas Sparks' first published novel. It was the third written after The Passing and The Royal Murders, which he did not publish. He wrote it over a period of six months in 1994. Literary agent Theresa Park discovered Sparks by picking the book out of her agency's slush pile and reading it. Park offered to represent him. In October 1995, Park secured a $1 million advance for the book from the Time Warner Book Group, and the novel was published in October 1996. It was on The New York Times Best Seller list in its first week of release. The Notebook was a hardcover best seller for more than a year.\nSet amid the austere beauty of the North Carolina coast begins the story of Noah Calhoun, a rural Southerner recently returned from the Second World War. Noah is restoring a plantation home to its former glory, and he is haunted by images of the beautiful girl he met fourteen years earlier, a girl he loved like no other. Unable to find her, yet unwilling to forget the summer they spent together, Noah is content to live with only memories...until she unexpectedly returns to his town to see him once again.\nLike a puzzle within a puzzle, the story of Noah and Allie is just the beginning. As it unfolds, their tale miraculously becomes something different, with much higher stakes. The result is a deeply moving portrait of love itself, the tender moments and the fundamental changes that affect us all. It is a story of miracles and emotions that will stay with you forever. (less)",
        bookAuthor: "Sam Shore",
        bookCategory: "Romance",
    },
    {
        id: 10,
        bookBackgroundImageURL: "/images/catalog/bookcover10.jpg",
        bookTitle: "Unspoken",
        bookDescription: "A young girl's courage is tested in this haunting, wordless story. When a farm girl discovers a runaway slave hiding in the barn",
        bookFullDescription: "A young girl's courage is tested in this haunting, wordless story. When a farm girl discovers a runaway slave hiding in the barn.\nPrincess Isabelle of The New Kingdom has lived her entire life in the confines of her palace. She spends her time hunting for the poverty-stricken Voiceless-people of the Old Kingdom who warred with her kingdom and ultimately lost-and dreaming of a world beyond the walls of her home. As the only remaining child of the king and queen, she is to be married off by her eighteenth birthday.\nWhen Izzy witnesses the use of forbidden magic in the woods outside the palace, she is attacked, and saved by an unknown man. Soon after she discovers her rescuer is a Voiceless servant in the castle named Fray, she befriends him to seek out the magic users who tried to kill her. Fray agrees to help, but not before Isabelle discovers the servant boy harbors a secret the king has tried to bury-that he is a Gwylis, people of the old Kingdom who made a pact with the demons of the underworld for the power to transform into giant ferocious wolves. But to shift into a beast, Fray must be able to speak the words to do so. If he is to thwart the attackers from killing her entire family, Izzy needs to cure the ailment that took away his voice.\nBut curing Fray holds more danger than she ever thought possible. The lies of her parents and the risk of putting her own life on the line deems as destructive as falling for the servant boy. If Isabelle is to save herself and Fray, she'll need to face enemy Gwylis, cross paths with usurper kings and princes, and decide what side she is on-human or wolf-or lose her kingdom forever.",
        bookAuthor: "Celia McMahon",
        bookCategory: "Classic",
    },
    {
        id: 11,
        bookBackgroundImageURL: "/images/catalog/bookcover11.jpg",
        bookTitle: "The white raven",
        bookDescription: "Sprinkled in is jealousy, revenge, drinking, a little Halloween fun, and some fairies you don't want to get on the wrong side of heaven",
        bookFullDescription: "Sprinkled in is jealousy, revenge, drinking, a little Halloween fun, and some fairies you don't want to get on the wrong side of heaven.\nIn her thirteenth life, Aven has settled into the now witchcraft-friendly Salem where she has found true happiness and friendship, maybe even love. Despite her contentment, the truth of Aven's existence haunts her. When she dies, her Spirit is forced from the Veil to live again in the body of a stranger.\nDoes the elusive white raven, who has shadowed Aven through each of her lives, hold the secret to her release--or is it the cause?\n To make matters worse, an unrelenting, twisted evil from Aven's past lurks closely behind her. Sustained by his hatred of the witch, he won't give up until she's paid for what she did to him.\nWhen the truth of Aven's connection to the white raven is revealed, it is more horrifying than she could ever have imagined.",
        bookAuthor: "Carrie D. Miller",
        bookCategory: "Classic",
    },
    {
        id: 12,
        bookBackgroundImageURL: "/images/catalog/bookcover12.jpg",
        bookTitle: "The winter king",
        bookDescription: "Uther, the High King, has died, leaving the infant Mordred as his only heir. His uncle, the loyal and gifted warlord Arthur, now.",
        bookFullDescription: "Uther, the High King, has died, leaving the infant Mordred as his only heir. His uncle, the loyal and gifted warlord Arthur.\nA village trapped in winter, a tyrannical god, and a girl who will do anything to keep her family alive.\nEver since Cora's father disappeared through the ice, whispers about her family's 'curse' have grown increasingly louder. Desperate to help her mother and siblings survive another bleak season in the Winter King's frozen grasp, Cora begins to bend (and even break) the rules she has kept since she was a little girl. But when she discovers a secret that's much bigger than herself, she realizes too late that she has put herself—and those she loves—in even greater peril.",
        bookAuthor: "Christie Cohen",
        bookCategory: "Classic",
    },
];

//Define the API
const api = express();

//Enable CORS
api.use(cors());

//Books end-point
api.get("/books", (request, response) => {
    response.send(books);
});

//Books by ID end-point
api.get("/books/:id", (request, response) => {
    const bookID = request.params.id;
    let bookToBeReturn = null;
    books.forEach((book) => {
        if (book.id == bookID) {
            bookToBeReturn = book;
        }
    });

    response.send(bookToBeReturn);
});

//Books by categroy end-point
api.get("/books/categories/:category", (request, response) => {
    const category = request.params.category;
    let booksToBeReturned = [];
    books.forEach((book) => {
        if (book.bookCategory == category) {
            booksToBeReturned.push(book);
        }
    });

    response.send(booksToBeReturned);
});

//Users end-point
api.get("/users", (request, response) => {
    response.send(users);
});

//Start API and listen to port 4000
api.listen(4000);