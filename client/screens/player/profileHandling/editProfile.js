import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createProfile,
  getCurrentProfile,
  upadteProfile,
} from "../../../Redux/actions/profile";
import { Button, Input } from "react-native-elements";

const profileSchema = yup.object({
  bio: yup.string(),
  PUBG: yup.string(),
  coc: yup.string(),
  cr: yup.string(),
  cod: yup.string(),
  freefire: yup.string(),
  riotId: yup.string(),
  tagline: yup.string(),
});

const EditProfile = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const myProfileiInfo = useSelector((state) => state.profile.userProfile);
  const {
    bio,
    gameIds: {
      PUBG,
      coc,
      cr,
      cod,
      freefire,
      valorant: { riotId, tagline },
    },
  } = myProfileiInfo;

  return (
    <View style={styles.content}>
      <Formik
        initialValues={{ bio, PUBG, coc, cr, cod, freefire, riotId, tagline }}
        validationSchema={profileSchema}
        onSubmit={(values) => {
          dispatch(
            upadteProfile({
              bio: values.bio,
              gameIds: {
                PUBG: values.PUBG,
                coc: values.coc,
                cr: values.cr,
                cod: values.cod,
                freefire: values.freefire,
                valorant: { riotId: values.riotId, tagline: values.tagline },
              },
            })
          );
          navigation.goBack();
        }}
      >
        {(formikprops) => (
          <View>
            <ScrollView>
              <View style={styles.commonStyleView}>
                <Text style={{ color: "white", fontSize: 18, paddingTop: 8 }}>
                  Bio:
                </Text>
                <Input
                  multiline
                  // style={}
                  placeholder={bio ? bio : "Your Bio"}
                  onChangeText={formikprops.handleChange("bio")}
                  value={formikprops.values.bio}
                  onBlur={formikprops.handleBlur("bio")}
                  errorMessage={
                    formikprops.touched.bio && formikprops.errors.bio
                  }
                />
              </View>
              <View style={styles.commonStyleView}>
                <Text style={{ color: "white", fontSize: 18, paddingTop: 8 }}>
                  PubgId:
                </Text>
                <Input
                  multiline
                  placeholder={PUBG ? PUBG : "Your PUBG Id"}
                  onChangeText={formikprops.handleChange("PUBG")}
                  value={formikprops.values.PUBG}
                  onBlur={formikprops.handleBlur("PUBG")}
                  errorMessage={
                    formikprops.touched.PUBG && formikprops.errors.PUBG
                  }
                />
              </View>
              <View style={styles.commonStyleView}>
                <Text style={{ color: "white", fontSize: 18, paddingTop: 8 }}>
                  cocTag:
                </Text>
                <Input
                  multiline
                  placeholder={coc ? coc : "Your coc tag"}
                  onChangeText={formikprops.handleChange("coc")}
                  value={formikprops.values.coc}
                  onBlur={formikprops.handleBlur("coc")}
                  errorMessage={
                    formikprops.touched.coc && formikprops.errors.coc
                  }
                />
              </View>
              <View style={styles.commonStyleView}>
                <Text style={{ color: "white", fontSize: 18, paddingTop: 8 }}>
                  cr Id:
                </Text>
                <Input
                  multiline
                  placeholder={cr ? cr : "Your cr Id"}
                  onChangeText={formikprops.handleChange("cr")}
                  value={formikprops.values.cr}
                  onBlur={formikprops.handleBlur("cr")}
                  errorMessage={formikprops.touched.cr && formikprops.errors.cr}
                />
              </View>
              <View style={styles.commonStyleView}>
                <Text style={{ color: "white", fontSize: 18, paddingTop: 8 }}>
                  cod Id:
                </Text>
                <Input
                  multiline
                  placeholder={cod ? cod : "Your cod Id"}
                  onChangeText={formikprops.handleChange("cod")}
                  value={formikprops.values.cod}
                  onBlur={formikprops.handleBlur("cod")}
                  errorMessage={
                    formikprops.touched.cod && formikprops.errors.cod
                  }
                />
              </View>
              <View style={styles.commonStyleView}>
                <Text style={{ color: "white", fontSize: 18, paddingTop: 8 }}>
                  Freefire Id:
                </Text>
                <Input
                  multiline
                  placeholder={freefire ? freefire : "Your freefire Id"}
                  onChangeText={formikprops.handleChange("freefire")}
                  value={formikprops.values.freefire}
                  onBlur={formikprops.handleBlur("freefire")}
                  errorMessage={
                    formikprops.touched.freefire && formikprops.errors.freefire
                  }
                />
              </View>
              <View style={styles.commonStyleView}>
                <Text style={{ color: "white", fontSize: 18, paddingTop: 8 }}>
                  riotId(valorant):
                </Text>
                <Input
                  multiline
                  placeholder={riotId ? riotId : "Your valorant riot Id"}
                  onChangeText={formikprops.handleChange("riotId")}
                  value={formikprops.values.riotId}
                  onBlur={formikprops.handleBlur("riotId")}
                  errorMessage={
                    formikprops.touched.riotId && formikprops.errors.riotId
                  }
                />
              </View>
              <View style={styles.commonStyleView}>
                <Text style={{ color: "white", fontSize: 18, paddingTop: 8 }}>
                  tagline(valorant):
                </Text>
                <Input
                  multiline
                  placeholder={tagline ? tagline : "Your valorant tagline"}
                  onChangeText={formikprops.handleChange("tagline")}
                  value={formikprops.values.tagline}
                  onBlur={formikprops.handleBlur("tagline")}
                  errorMessage={
                    formikprops.touched.tagline && formikprops.errors.tagline
                  }
                />
              </View>
              <Button onPress={formikprops.handleSubmit} title="Save" />
            </ScrollView>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    // backgroundColor: 'white',
    padding: 22,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  commonStyleView: {
    flexDirection: "row",
  },
});

export default EditProfile;
