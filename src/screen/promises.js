// // Syncronize: One after another, In Order                  // one undefined three
// // Asyncronize: Allow other process to run, Not in order    // one Promises<Pending> three    // axios without async await
// // Promise is asyncronize  
// // async await: Wait for asyncronize call                   // one two (wait for 3 sec) three // axios with async await                                 
// // Callback function is called after working some task.
// // Promises.all resolve all

// import { View, Text } from 'react-native'
// import React, { useEffect } from 'react'

// export default function promises() {


//     const one = () => {
//         return "One Value";
//     }

//     const two = () => {
//         return new Promise((resolve, reject) => {
//             setTimeout(
//                 () => {
//                     resolve("Two Value");
//                 }, 2000
//             )
//         })
//     }

//     const three = () => {
//         return "Three Value";
//     }

//     const All = async () => {
//         const oneVal = one();
//         console.log(oneVal);

//         const twoVal = await two();
//         console.log(twoVal);

//         const threeVal = three();
//         console.log(threeVal);
//     }

//     useEffect(
//         () => {
//             All()
//         },
//     [])

//     const dispplay = (z) => {
//         console.log(z);
//     }
    
//     const sum = (callbackFun) => {
//         let x=5, y=3, z;
//         z = x + y;

//         callbackFun(z)
//     }

//     sum(dispplay);

//     return (
//         <View>
//             <Text>promises</Text>
//         </View>
//     )
// }