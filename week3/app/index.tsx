import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList
} from 'react-native';

const DATA = [
  { id: '1', title: 'การใช้ View' },
  { id: '2', title: 'การใช้ Text' },
  { id: '3', title: 'การใช้ ScrollView' },
  { id: '4', title: 'การใช้ FlatList' },
];

const App = () => {

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <View style = {styles.itemContainer}>
      <View style = {styles.dot} />
      <Text style = {styles.itemText}>{item.title}</Text>
    </View>
  );
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* contentContainerStyle คือการกำหนดสไตล์ให้กับเนื้อหาภายใน ScrollView */}

      <View style = {styles.header}>
        <Text style = {styles.headerText}> My Profile </Text>
      </View>

      <View style = {styles.row}>
        <View style = {[styles.box, { backgroundColor: '#FF6B6B'}]}>
          <Text style = {styles.boxText}> รหัส </Text>
          <Text style = {styles.boxText}> 66110923 </Text>
        </View>
         <View style = {[styles.box, { backgroundColor: '#4ECDC4'}]}>
          <Text style = {styles.boxText}> คณะ </Text>
          <Text style = {styles.boxText}> วิศวกรรมศาสตร์ </Text>
        </View>
        <View style = {[styles.box, { backgroundColor: '#df5edf'}]}>
          <Text style = {styles.boxText}> สาขา </Text>
          <Text style = {styles.boxText}> CE </Text>
        </View>
      </View>

      <View style = {styles.contentSection}>
        <Text style = {styles.title}>ข้อมูลส่วนตัว:</Text>
        {Array.from({length: 1}).map((_, index) => (
          <View key = {index} style = {styles.listItem}>
            <Text>ชื่อ : ฉัตรเฉลิม เล้าวาลิต</Text>
          </View>
        ))}
        {Array.from({length: 1}).map((_, index) => (
          <View key = {index} style = {styles.listItem}>
            <Text>ชื่อเล่น : อัยวี่</Text>
          </View>
        ))}
        {Array.from({length: 1}).map((_, index) => (
          <View key = {index} style = {styles.listItem}>
            <Text>อีเมล : 66110923@dpu.ac.th</Text>
          </View>
        ))}
      </View>

      <View style = {styles.contentSection}>
        <Text style = {styles.title}>การศึกษา:</Text>
        {Array.from({length: 1}).map((_, index) => (
          <View key = {index} style = {styles.listItem}>
            <Text>ระดับอุดมศึกษา : มหาวิทยาลัยธุรกิจบัณฑิตย์</Text>
          </View>
        ))}
        {Array.from({length: 1}).map((_, index) => (
          <View key = {index} style = {styles.listItem}>
            <Text>สาขา : วิศวคอมพิวเตอร์ (ชั้นปีที่3)</Text>
          </View>
        ))}
      </View>

       <View style = {styles.contentSection}>
        <Text style = {styles.title}>ที่อยู่:</Text>
        {Array.from({length: 1}).map((_, index) => (
          <View key = {index} style = {styles.listItem}>
            <Text>15/14 หมู่9 ต.ละหาร อ.บางบัวทอง จ.นนทบุรี</Text>
          </View>
        ))}
      </View>

      <View style = {styles.contentSection}>
        <FlatList
          data = {DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={<Text style = {styles.headerFlatList}>หัวข้อที่น่าสนใจ</Text>}
          />
      </View>

    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
  header: {
    height: 100,
    backgroundColor: '#1A535C',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  box: {
    flex: 1,
    height: 100,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  boxText: {
    color: 'white',
    fontWeight: '600',
  },
  contentSection: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#545d5a',
  },
  contentSectionFlatlist: {
    marginTop: 20,
  },
  headerFlatList: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#2238d7ff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'blue',
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
  },
});

export default App;