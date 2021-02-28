import Home from '../screens/Home/Home';
import CharactersScreen from '../screens/CharactersScreen/CharactersScreen';
import CharacterDetailsScreen from '../screens/CharacterDetailScreen/CharacterDetailsScreen';
import Login from '../screens/Login/Login';
import ProductsScreen from '../screens/Products/ProductsScreen';
import Register from '../screens/Register/Register';
import AddProductScreen from '../screens/AddProductScreen/AddProductScreen';
import Checkout from '../components/Checkout/Checkout';
import VolumesScreen from '../screens/VolumesScreen/VolumesScreen';
import VolumesDetailScreen from '../screens/VolumesDetailScreen/VolumesDetailScreen';
import BooksScreen from '../screens/BooksScreen/BooksScreen';
import ForumScreen from '../screens/ForumScreen/ForumScreen';
import AddPostScreen from '../screens/AddPostScreen/AddPostScreen';
import NotFound from '../components/Error/NotFound';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

export const routes = [
    {
        path: '/',
        exact:true,
        component: () => <Home/>,
        title:'Ana Sayfa',
        isLink:true,
        isPrivate:false,
    },
    {
        path:'/profile/:username',
        component: () => <ProfileScreen/>,
        title:'Profil',
        isLink:false,
        isPrivate:true
    },
    {
        title: 'Çizgi Roman',
        isLink:true,
        isPrivate: false,
        isDropdown: true,
        links : ['Karakterler','Çizgi Romanlar']
    },
    {
        path: '/characters',
        exact:true,
        component: () => <CharactersScreen/>,
        title:'Karakterler',
        isLink:false,
        isPrivate:false,
    },
    {
        path: '/characters/:characterId',
        component: () => <CharacterDetailsScreen/>,
        title:'Character Detail',
        isLink:false,
        isPrivate:true,
    },
    {
        path: '/volumes',
        exact: true,
        component: () => <VolumesScreen/>,
        title:'Çizgi Romanlar',
        isLink: false,
        isPrivate: false,
    },
    {
        path: '/volumes/:volumeId',
        component: () => <VolumesDetailScreen/>,
        title:'Volume Detail',
        isLink:false,
        isPrivate: true,
    },
    {
        path: '/books',
        component: () => <BooksScreen/>,
        title:'Kitaplar',
        isLink: true,
        isPrivate: false,
    },
    {
        path: '/products',
        exact:true,
        component: () => <ProductsScreen/>,
        title:'Ürünler',
        isLink:true,
        isPrivate:true,
    },
    {
        path: '/products/new',
        component: () => <AddProductScreen/>,
        title:'Add Product',
        isLink:false,
        isPrivate:true,
    },
    {
        path: '/forum',
        exact: true,
        component: () => <ForumScreen/>,
        title:'Forum',
        isLink: true,
        isPrivate: false,
    },
    {
        path:'/forum/new',
        exact: true,
        component: () => <AddPostScreen/>,
        title:'Add Post',
        isLink: false,
        isPrivate: true,
    },
    {
        path: '/login',
        exact:true,
        component: () => <Login/>,
        title:'Login',
        isLink:false,
        isPrivate:false,
    },
    {
        path: '/register',
        component: () => <Register/>,
        title:'Register',
        isLink:false,
        isPrivate:false,
    },
    {
        path:'/checkout',
        component:() => <Checkout/>,
        title:'Checkout',
        isLink:false,
        isPrivate:true,
    },
    {
        component:() => <NotFound/>,
    }
]