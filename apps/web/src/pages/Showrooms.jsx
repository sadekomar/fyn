import React, { useEffect, useState } from "react";
import { Grid, Container, Link } from "@radix-ui/themes";
import { Link as Link } from "react-router-dom";

import { BrandInfo } from "../components/BrandInfo";
import { BrandPhoto } from "./BrandPhoto";

export function Showrooms() {

    const showrooms = {
        "flynskykids": "nasr-city",
        "dizzylocal": "new-cairo",
        "domanza": "maadi",
        "t-drops": "sherouk",
        "localista": "zamalek",
        "collab": "sheraton",
        "go-native": "6-october",
        "coma": "new-cairo",
        "coma nasr-city": "nasr-city",
        "mr-local": "alexandria",
        "locally": ["City-stars", "Courtyard", "Park Mall"],
        "mad-stitches": ["city-stars", "sahel"],
        "labelled": "new-cairo",
        "x-labels": "maadi",
        "mad-stitches sahel": ["diplo", "sidi abdel rahman"],
        "monkie": "sheikh-zayed",
        "native-x": "heliopolis",
        "localinn": "sheikh zayed",
        "things-and-lillies": "gouna",
        "all-novelties": "sheikh zayed",
        "dloco": "zamalek",
        "civic": "mansoura",
        "sash": "ismalia",
        "drippz": "nasr-city",
        "bottiqa": "maadi",
        "locally-(new-cairo)": "new-cairo",
        "locally-(maadi)": "maadi",
        "locally-(nasr-city)": "nasr-city",
        "maz-market": "",
        "space-17": "6-October",
        "flagged": "6-October"
    };

    return <>
        <Container px='4' size={'4'}>
            <Grid columns={{
                initial: '2',
                xs: '3',
                sm: '4',
                md: '5',
            }}>
                {
                    Object.keys(showrooms).map((showroom, index) => (
                        <div>
                            {/* <BrandPhoto brand={showrooms[showroom]} key={index} /> */}
                            <BrandInfo brand={showroom} key={index} />
                        </div>
                    ))
                }
            </Grid>
        </Container>
    </>;
}