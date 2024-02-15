import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';

import {
  Assets,
  Card,
  Colors,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import Pagination from './Pagination';
import Header from './Header';

export default function StarWarsCards({navigation}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [favourites, setFavourites] = useState([]);
  const [maleCount, setMaleCount] = useState(0);
  const [sheMaleCount, setSheMaleCount] = useState(0);
  const [noGender, setNoGender] = useState(0);
  const [likePressed, setLikePressed] = useState({});

  // Кількість даних на одній сторінці з серверу
  const itemsPerPage = 10;

  //Завантажуємо дані з API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?page=${currentPageNumber}`,
      );
      const existingFavorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = existingFavorites
        ? JSON.parse(existingFavorites)
        : [];
      setFavourites(favoritesArray);
      const resultObject = favoritesArray.reduce((acc, item) => {
        acc[item.name] = true;
        return acc;
      }, {});

      setLikePressed(resultObject);
      const genderCounts = favoritesArray.reduce((acc, item) => {
        acc[item.gender] = (acc[item.gender] || 0) + 1;
        return acc;
      }, {});

      setMaleCount(genderCounts['male'] || 0);
      setSheMaleCount(genderCounts['female'] || 0);
      setNoGender(genderCounts['n/a'] || 0);
      setData(response.data.results);
      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  //Оновлюємо дані в залежності від змін
  useEffect(() => {
    fetchData();
  }, [currentPageNumber]);

  //Функції управління пагінацією
  const handlePrevPage = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber(currentPageNumber - 1);
      setIsLoaded(false);
    }
  };
  const handleNextPage = () => {
    if (currentPageNumber < totalPages) {
      setCurrentPageNumber(currentPageNumber + 1);
      setIsLoaded(false);
    }
  };

  //Управління збереженим
  const handleAddToFavorites = async item => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = existingFavorites
        ? JSON.parse(existingFavorites)
        : [];

      const isObjectInFavorites = favoritesArray.some(
        favorite => favorite.name === item.name,
      );

      if (!isObjectInFavorites) {
        favoritesArray.push({name: item.name, gender: item.gender});
        setLikePressed({...likePressed, [item.name]: true});
      } else {
        const updatedFavorites = favoritesArray.filter(
          favorite => favorite.name !== item.name,
        );

        favoritesArray = updatedFavorites;
        setLikePressed({...likePressed, [item.name]: false});
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      setFavourites(favoritesArray);
      const genderCounts = favoritesArray.reduce((acc, item) => {
        acc[item.gender] = (acc[item.gender] || 0) + 1;
        return acc;
      }, {});

      setMaleCount(genderCounts['male'] || 0);
      setSheMaleCount(genderCounts['female'] || 0);
      setNoGender(genderCounts['n/a'] || 0);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };
  //Скинути збережені дані
  const handleReset = async () => {
    try {
      // Скинути обраних об'єктів до порожнього масиву
      await AsyncStorage.setItem('favorites', JSON.stringify([]));

      // Оновити стан компонента з обраними об'єктами
      setFavourites([]);
      setLikePressed({});
      setMaleCount(0);
      setSheMaleCount(0);
      setNoGender(0);

      console.log('Дані скинуті до початкового стану.');
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  };

  const ColumnNames = () => (
    <View
      row
      width="90%"
      backgroundColor="lightgrey"
      borderRadius={12}
      style={{alignSelf: 'center'}}
      padding-10>
      <View width="10%" center>
        <Text>Fav</Text>
      </View>
      <View width="40%" center style={{borderRightWidth: 1}}>
        <Text>Name</Text>
      </View>

      <View width="35%" center style={{borderRightWidth: 1}}>
        <Text>Birth Year</Text>
      </View>
      <View width="15%" center>
        <Text>More</Text>
      </View>
    </View>
  );
  //Картка з даними по StarWars
  const MyCard = ({item, likePressed, handleAddToFavorites}) => (
    <View center paddingT-5 marginT->
      <Card
        center
        borderRadius={12}
        width={'90%'}
        height={60}
        marginB-20
        padding-5
        backgroundColor={Colors.dark80}>
        <View row center>
          <View width="10%" center>
            <TouchableOpacity
              center
              flex={0}
              onPress={() => handleAddToFavorites(item)}>
              <Image
                assetName={likePressed ? 'likePressed' : 'like'}
                resizeMode="contain"
                style={{height: 25, width: 25}}
              />
            </TouchableOpacity>
          </View>
          <View width="40%" center style={{borderRightWidth: 1}}>
            <Text>{item.name}</Text>
          </View>
          <View width="35%" center style={{borderRightWidth: 1}}>
            <Text>{item.birth_year}</Text>
          </View>
          <View width="15%" center>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DetailedCard', {
                  detailedData: item,
                });
              }}>
              <Image
                assetName="more"
                resizeMode="contain"
                style={{height: 25, width: 25}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </View>
  );

  return (
    <View useSafeArea={true} style={{backgroundColor: 'white'}} flex>
      {isLoaded ? (
        <>
          <Header
            male={maleCount}
            feMale={sheMaleCount}
            noGender={noGender}
            handleReset={handleReset}
          />

          <ColumnNames />
          <FlatList
            data={data}
            renderItem={({item}) => (
              <MyCard
                item={item}
                likePressed={likePressed[item.name] || false}
                setLikePressed={value =>
                  setLikePressed({...likePressed, [item.name]: value})
                }
                handleAddToFavorites={handleAddToFavorites}
              />
            )}
            keyExtractor={data => data.name}
          />

          <Pagination
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            totalPages={totalPages}
            currentPageNumber={currentPageNumber}
          />
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

Assets.loadAssetsGroup('icons', {
  like: require('../../assets/like.png'),
  likePressed: require('../../assets/likePressed.png'),
  more: require('../../assets/more.png'),
});
