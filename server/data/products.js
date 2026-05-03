const products = [
    {
        id: 1,
        image: "https://images.bewakoof.com/t640/men-s-white-vengeance-typography-oversized-t-shirt-519142-1745907892-1.jpg",
        tittle: "CleanCuts x Bat Man",
        desc: "Men-s-white-vengeance Logo Oversized T-shirt",
        price: 499,
        rating: 4.3,
        category: "men"
    },
    {
        id: 2,
        image: "https://images.bewakoof.com/t640/men-s-black-need-space-snoopy-graphic-printed-oversized-t-shirt-630667-1730989610-1.jpg",
        tittle: "CleanCuts x Space",
        desc: "men-s-black-need-space-snoopy-graphic-printed-oversized-t-shirt",
        price: 499,
        rating: 4.5,
        category: "men"
    },
    {
        id: 3,
        image: "https://images.bewakoof.com/t640/men-s-black-explorer-nasa-graphic-printed-oversized-t-shirt-591083-1744355436-1.jpg",
        tittle: "CleanCuts x NASA",
        desc: "men-s-black-explorer-nasa-graphic-printed-oversized-t-shirt",
        price: 499,
        rating: 4.8,
        category: "men"
    },
    {
        id: 4,
        image: "https://images.bewakoof.com/t640/men-s-black-ghost-rider-spirit-of-vengeance-graphic-printed-oversized-t-shirt-604148-1730987047-1.jpg",
        tittle: "CleanCuts x Ghost-Rider",
        desc: "men-s-black-ghost-rider-spirit-of-vengeance-graphic-printed-oversized-t-shirt",
        price: 549,
        rating: 4.6,
        category: "men"
    },
    {
        id: 5,
        image: "https://images.bewakoof.com/t640/men-s-orange-bit-rick-morty-graphic-printed-oversized-t-shirt-605113-1737366171-1.jpg",
        tittle: "CleanCuts x Rick & Morty",
        desc: "men-s-orange-bit-rick-morty-graphic-printed-oversized-t-shirt",
        price: 599,
        rating: 4.9,
        category: "men"
    },
    {
        id: 6,
        image: "https://images.bewakoof.com/t640/men-s-off-white-oversized-t-shirt-646790-1751459329-1.jpg",
        tittle: "CleanCuts x Off-White Classic",
        desc: "men-s-off-white-oversized-t-shirt minimalist premium cotton blend",
        price: 449,
        rating: 4.2,
        category: "men"
    },
    {
        id: 7,
        image: "https://images.bewakoof.com/t640/men-s-brown-shikamaru-drag-graphic-printed-oversized-t-shirt-625301-1736761806-1.jpg",
        tittle: "CleanCuts x Shikamaru",
        desc: "men-s-brown-shikamaru-drag-graphic-printed-oversized-t-shirt",
        price: 649,
        rating: 4.7,
        category: "men"
    },
    {
        id: 8,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=640&q=80",
        tittle: "CleanCuts x Minimalist",
        desc: "Classic white premium heavyweight cotton oversized t-shirt",
        price: 399,
        rating: 4.4,
        category: "men"
    },
    {
        id: 9,
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=640&q=80",
        tittle: "CleanCuts x Urban Black",
        desc: "Essential black oversized tee for your daily streetwear rotation",
        price: 399,
        rating: 4.5,
        category: "men"
    },
    {
        id: 10,
        image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=640&q=80",
        tittle: "CleanCuts x Essential Grey",
        desc: "Vintage washed grey oversized drop-shoulder t-shirt",
        price: 449,
        rating: 4.6,
        category: "men"
    },
    {
        id: 11,
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=640&q=80",
        tittle: "CleanCuts x Vintage Wash",
        desc: "Premium acid-washed oversized t-shirt with dropped shoulders",
        price: 499,
        rating: 4.8,
        category: "men"
    },
    {
        id: 12,
        image: "/images/vintage1.png",
        tittle: "CleanCuts x Vintage Skull",
        desc: "Black oversized graphic t-shirt with vintage skull design. Urban alleyway street style.",
        price: 549,
        rating: 4.8,
        category: "men"
    },
    {
        id: 13,
        image: "/images/vintage2.png",
        tittle: "CleanCuts x Retro Type",
        desc: "White oversized t-shirt with retro typography. Perfect for skatepark sessions.",
        price: 499,
        rating: 4.6,
        category: "men"
    },
    {
        id: 14,
        image: "/images/vintage3.png",
        tittle: "CleanCuts x Neo Tokyo",
        desc: "Dark grey oversized t-shirt with anime graphic. Distressed vintage aesthetic.",
        price: 599,
        rating: 4.9,
        category: "men"
    },
    {
        id: 15,
        image: "/images/vintage4.png",
        tittle: "CleanCuts x Minimal Decay",
        desc: "Olive green oversized t-shirt with minimalist logo. Raw urban decay style.",
        price: 449,
        rating: 4.5,
        category: "men"
    },
    {
        id: 16,
        image: "/images/women_pink.png",
        tittle: "CleanCuts Women x Pink",
        desc: "Premium oversized pink t-shirt for women.",
        price: 499,
        rating: 4.8,
        category: "women"
    },
    {
        id: 17,
        image: "/images/women_classic.png",
        tittle: "CleanCuts Women x Classic",
        desc: "Classic fit for women in urban aesthetics.",
        price: 549,
        rating: 4.7,
        category: "women"
    },
    {
        id: 18,
        image: "/images/women_vintage.png",
        tittle: "CleanCuts Women x Vintage",
        desc: "Vintage washed grey tee for women.",
        price: 499,
        rating: 4.6,
        category: "women"
    },
    {
        id: 19,
        image: "/images/women_urban.png",
        tittle: "CleanCuts Women x Urban",
        desc: "Urban decay inspired fit for women.",
        price: 599,
        rating: 4.9,
        category: "women"
    },
    {
        id: 20,
        image: "/images/kids_play.png",
        tittle: "CleanCuts Kids x Play",
        desc: "Playful yellow tee for active kids.",
        price: 399,
        rating: 4.8,
        category: "kids"
    },
    {
        id: 21,
        image: "/images/kids_explorer.png",
        tittle: "CleanCuts Kids x Explorer",
        desc: "Explorer edition for young adventurers.",
        price: 449,
        rating: 4.7,
        category: "kids"
    },
    {
        id: 22,
        image: "/images/kids_dream.png",
        tittle: "CleanCuts Kids x Dream",
        desc: "Dream big comfortable kids wear.",
        price: 349,
        rating: 4.6,
        category: "kids"
    },
    {
        id: 23,
        image: "/images/kids_style.png",
        tittle: "CleanCuts Kids x Style",
        desc: "Stylish oversized fit for kids.",
        price: 399,
        rating: 4.9,
        category: "kids"
    },
    {
        id: 24,
        image: "/images/brand_supreme.png",
        tittle: "Supreme Drop",
        desc: "Exclusive brand drop, premium material.",
        price: 1999,
        rating: 4.9,
        category: "brands"
    },
    {
        id: 25,
        image: "/images/brand_offwhite.png",
        tittle: "Off-White Signature",
        desc: "Signature brand edition oversized fit.",
        price: 2499,
        rating: 4.8,
        category: "brands"
    },
    {
        id: 26,
        image: "/images/brand_nike.png",
        tittle: "Nike SB Exclusive",
        desc: "Skateboard exclusive premium wear.",
        price: 1499,
        rating: 4.7,
        category: "brands"
    },
    {
        id: 27,
        image: "/images/brand_bape.png",
        tittle: "BAPE Classic",
        desc: "Classic streetwear brand aesthetic.",
        price: 2999,
        rating: 4.9,
        category: "brands"
    },
    {
        id: 28,
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=640&q=80",
        tittle: "CleanCuts x Cyberpunk",
        desc: "Neon city skyline graphic printed oversized t-shirt in stealth black.",
        price: 699,
        rating: 4.8,
        category: "men"
    },
    {
        id: 29,
        image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=640&q=80",
        tittle: "CleanCuts x Anime Tokyo",
        desc: "Vintage Japanese streetwear style oversized graphic tee.",
        price: 549,
        rating: 4.7,
        category: "men"
    },
    {
        id: 30,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=640&q=80",
        tittle: "CleanCuts x Retro Arcade",
        desc: "White oversized t-shirt featuring 8-bit retro gaming graphics.",
        price: 499,
        rating: 4.6,
        category: "men"
    },
    {
        id: 31,
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=640&q=80",
        tittle: "CleanCuts x The Void",
        desc: "Abstract dark-art graphic print on premium heavyweight cotton.",
        price: 599,
        rating: 4.9,
        category: "men"
    },
    {
        id: 32,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=640&q=80",
        tittle: "CleanCuts x Marvel Venom",
        desc: "Official collaboration symbiote oversized black graphic tee.",
        price: 749,
        rating: 4.9,
        category: "men"
    }
];

module.exports = products;
