import logo from './Images/logo.png'
import logoText from './Images/logoText.png'
import certificate from './Images/CHARLES NJOKU CERTIFICATE.pdf'

const Logo = logo
const LogoText = logoText

const Navinfo = [
    {
        title: 'Dashboard',
        icon: 'grid-fill'
    },
    {
        title: 'Organizations',
        icon: 'people-fill'
    },
    {
        title: 'Students',
        icon: 'award-fill'
    },
    {
        title: 'Settings',
        icon: 'wrench'
    },
    {
        title: 'Saculiet Website',
        icon: 'globe2',
        link: 'https://saculietdrivingschool.com'
    },
]

const OrganizationsInfo = [
    {
        name: 'Dano',
        id: 'danoid',
        email: 'dano@dano.com',
        location: 'Lokoja, Kwara',
        reason: 'DANO Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'pending',
        time: '12-03-2024'   
    },
    {
        name: 'Cowbell',
        id: 'cowbellid',
        email: 'cowbell@bell.com',
        location: 'Ibadan, Oyo',
        reason: 'COWBELL Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'active',
        time: '11-23-24'   
    },
    {
        name: 'Camry',
        id: 'camryid',
        email: 'Camry@calmry.com',
        location: 'Abuja, Zaria',
        reason:'CAMRY Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'expired',
        time: '23-34-45'  
    },
    {
        name: 'Cowrywise',
        id: 'cowrywiseid',
        email: 'cowry@cow.com',
        location: 'Abuja, Zaria',
        reason:'CAMRY Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'cancelled',
        time: '23-34-45'  
    },
    {
        name: 'Conoil',
        id: 'Conoilid',
        email: 'conoil@oil.com',
        location: 'Ilorin, Kwara',
        reason: 'Conoil Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'active',
        time: '12-03-2024'   
    },
    {
        name: 'Cow',
        id: 'cowbelid',
        email: 'cow@cow.com',
        location: 'Ibadan, Oyo',
        reason: 'COW Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'active',
        time: '11-23-24'   
    },
    {
        name: 'Cam',
        id: 'camid',
        email: 'Cam@cam.com',
        location: 'Abuja, Zaria',
        reason:'CAM Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'expired',
        time: '23-34-45'  
    },
    {
        name: 'Mariewise',
        id: 'Mariewiseid',
        email: 'Marie@marie.com',
        location: 'Abuja, Zaria',
        reason:'Mariewiise Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'cancelled',
        time: '23-34-45'  
    },
    {
        name: 'Dano',
        id: 'danoid',
        email: 'dano@dano.com',
        location: 'Lokoja, Kwara',
        reason: 'DANO Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'pending',
        time: '12-03-2024'   
    },
    {
        name: 'Cowbell',
        id: 'cowbellid',
        email: 'cowbell@bell.com',
        location: 'Ibadan, Oyo',
        reason: 'COWBELL Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'active',
        time: '11-23-24'   
    },
    {
        name: 'Camry',
        id: 'camryid',
        email: 'Camry@calmry.com',
        location: 'Abuja, Zaria',
        reason:'CAMRY Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'expired',
        time: '23-34-45'  
    },
    {
        name: 'Cowrywise',
        id: 'cowrywiseid',
        email: 'cowry@cow.com',
        location: 'Abuja, Zaria',
        reason:'CAMRY Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'cancelled',
        time: '23-34-45'  
    },
    {
        name: 'Conoil',
        id: 'Conoilid',
        email: 'conoil@oil.com',
        location: 'Ilorin, Kwara',
        reason: 'Conoil Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'active',
        time: '12-03-2024'   
    },
    {
        name: 'Cow',
        id: 'cowbelid',
        email: 'cow@cow.com',
        location: 'Ibadan, Oyo',
        reason: 'COW Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'active',
        time: '11-23-24'   
    },
    {
        name: 'Cam',
        id: 'camid',
        email: 'Cam@cam.com',
        location: 'Abuja, Zaria',
        reason:'CAM Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'expired',
        time: '23-34-45'  
    },
    {
        name: 'Mariewise',
        id: 'Mariewiseid',
        email: 'Marie@marie.com',
        location: 'Abuja, Zaria',
        reason:'Mariewiise Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis provident quam, dolores dicta suscipit cumque doloribus enim non quisquam amet ex a consequatur ducimus possimus quas. Fugit corporis quidem pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis itaque error reprehenderit facere labore quam, ea quos sed quae eveniet? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ipsum tenetur eveniet eligendi consectetur autem adipisci quidem sequi earum distinctio.',
        status: 'cancelled',
        time: '23-34-45'  
    },
]

const StudentsInfo = [
    {
        name: 'Emmanuel Sunday',
        regNo: '409u509js09',
        id: '409u509js09',
        email: 'sunday@sun.com',
        testScore: 80,
        examScore: 70,
        certificate: certificate,
    },
    {
        name: 'Olufemi Emannuel',
        regNo: '324039j3rijdf',
        id: '324039j3rijdf',
    },
    {
        name: 'Kolawole Taiwo',
        regNo: 'w2pk2-40-2-40moms',
        id: 'w2pk2-40-2-40moms',
    },
    {
        name: 'Emmanuel Sunday',
        regNo: '409u509js09',
        id: '409u509js09',
        email: 'sunday@sun.com',
        admissionDate: '12-02-2012',
        certificationDate: '10-05-2012',
        performancePercentage: 90
    },
    {
        name: 'Olufemi Emannuel',
        regNo: '324039j3rijdf',
        id: '324039j3rijdf',
    },
    {
        name: 'Kolawole Taiwo',
        regNo: 'w2pk2-40-2-40moms',
        id: 'w2pk2-40-2-40moms',
    },
    {
        name: 'Emmanuel Sunday',
        regNo: '409u509js09',
        id: '409u509js09',
        email: 'sunday@sun.com',
        admissionDate: '12-02-2012',
        certificationDate: '10-05-2012',
        performancePercentage: 90
    },
    {
        name: 'Olufemi Emannuel',
        regNo: '324039j3rijdf',
        id: '324039j3rijdf',
    },
    {
        name: 'Kolawole Taiwo',
        regNo: 'w2pk2-40-2-40moms',
        id: 'w2pk2-40-2-40moms',
    },
    {
        name: 'Emmanuel Sunday',
        regNo: '409u509js09',
        id: '409u509js09',
        email: 'sunday@sun.com',
        admissionDate: '12-02-2012',
        certificationDate: '10-05-2012',
        performancePercentage: 90
    },
    {
        name: 'Olufemi Emannuel',
        regNo: '324039j3rijdf',
        id: '324039j3rijdf',
    },
    {
        name: 'Kolawole Taiwo',
        regNo: 'w2pk2-40-2-40moms',
        id: 'w2pk2-40-2-40moms',
    },
    {
        name: 'Emmanuel Sunday',
        regNo: '409u509js09',
        id: '409u509js09',
        email: 'sunday@sun.com',
        admissionDate: '12-02-2012',
        certificationDate: '10-05-2012',
        performancePercentage: 90
    },
    {
        name: 'Olufemi Emannuel',
        regNo: '324039j3rijdf',
        id: '324039j3rijdf',
    },
    {
        name: 'Kolawole Taiwo',
        regNo: 'w2pk2-40-2-40moms',
        id: 'w2pk2-40-2-40moms',
    },
    {
        name: 'Emmanuel Sunday',
        regNo: '409u509js09',
        id: '409u509js09',
        email: 'sunday@sun.com',
        admissionDate: '12-02-2012',
        certificationDate: '10-05-2012',
        performancePercentage: 90
    },
    {
        name: 'Olufemi Emannuel',
        regNo: '324039j3rijdf',
        id: '324039j3rijdf',
    },
    {
        name: 'Kolawole Taiwo',
        regNo: 'w2pk2-40-2-40moms',
        id: 'w2pk2-40-2-40moms',
    },
]

export { Navinfo, LogoText, Logo, OrganizationsInfo, StudentsInfo }



