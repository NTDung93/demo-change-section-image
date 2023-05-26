import React, { useState } from 'react';
import './App.css';

interface DemoSection {
  id: number;
  image: string;
}

const demoSections: DemoSection[] = [
  { id: 1, image: 'https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg' },
  { id: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Z7CiJarJs_gBDxtL938UYbHahvqR4jAhRQ&usqp=CAU' },
  { id: 3, image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEBUSEBIPEBUQEhcVFRUPDxUPDxAQFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFRAQFSseHR8rLS0rKy0rKy0rLS0rLS0tLS0tKysrKystLS0tLS0tKy0tLS0tKystLS4tLS0rLSsrK//AABEIAQoAvgMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAAAQIDBAUGBwj/xAA8EAACAgECBAMEBwcCBwAAAAAAAQIDEQQhBRIxQQZRcSJhgZEHEzJCUqGxIzNywdHh8BSiJFNigpLC8f/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAIBEBAQACAwACAwEAAAAAAAAAAAECEQMSITJhIjFBE//aAAwDAQACEQMRAD8A9CAwI2QDABAMAEAwAQDABAMAEAwAQDAAAAAAAAEAwAQmSEwGAAAAMAEAxAAAAAAAAAAwEAAAAAAAAMBAAAADDACFIYpgSDAwIFgBgAgGACAYAIBgAsBgYALAYGACwAwAWAwMADAYGACAYAREyTEAwGACAYAadBTGbfO8KMct5xgVsaM4jd/5RePmjmcVv5a1FbOye/8ADHt83+Rni9jnnnq6jrhx9puuvdQ44ezT6Si+aL9GVFOg1v1Tw/ahL7UezXmvJ+836vTqOJRfNCazCXmvJ+9GsMuzOeHWswElHIjTBAMAEAwAQDABAWUUym8RWWdnScES3sfM/JbL4sW6HDA9XbpYquUYxjHMWvZXuPKIksoAGGChEWTIgSwGBgAgGGAOTxqX7SteUG/mwh0M3HZ/8RH3Vr9ZF9DykefP5PVx/GLJVs6XCNeop0XfYm9pd659n6EdLp3jrGxP7vMk/hnuaNVwT62typ5lKPWEuoxl3uGeUs1T1OmlVLEvVNdJLs0Qtjh+u69GbPDs3qK3RcmnWvZbTUory36oeq4dOKSxlxeNu67NHonry3y6c8C+Wlmvuy39wv8ATSxnlax7gKQJXQcEnP2c9M7ZIxafRp58u4CZfptK57/ZiusnskaqOHbc1nsxSy8vGy/RHE4lxtWy5Ktq4+W3N72TLLrFxna+PV6C6uK5YfGXeR0oWJnjtBqGjr067HU81z3XX/PTtTl2PHTjhteTZ6SrVKTXwPO2/afq/wBTtx3yueU0iAAdGQRZIjMCYDwGAFgMDDAHC8Tw5bKpfig18pf3J6GxYW/+1SLPGsf+Hpn5TcW/LKz/ACM3h29craipOPeabSX8K/mcc8fXowy/F6vhmjT35uv4Y8vzT2/I9BVTGOMdcdehn4ZH2Flp+kVFfBI2R3OuOOo4Z5bqdVe+di/lTIKWw+Y25pfVoUq0LIcwHjfpT4dKeglKtvmrfNt1weY+irhsJxlqbW5WQxFKUniKaftKPntg+paylW1yg+klj1PFQ8NXaebjQ1GE1hvO+E9kBx/FniWV03RVlQi8Sa62NdvQwaBNddv1Ojx/gttXNOtReFzTsn7MYr8MUvccnSVycedqSj+KS5Iyfuz/AHfuOHJja9PHlNPQaew1RtOPp9SuifQ2wuPNXd2eHXe2vdl/BLJmM/C7s2P3Vz/TBpPTw/F5+X5AQwOrkRGZPBGYEwGAUgGCQGXxFo5X6GcIJylGSnFLq+Xql8MlPg/h01XC7f2sqUWvJ8vT4HreF8PaWX8jrR06XZfBDrtO+vGWmPlj9PyL4wLlFIo1ushVCVlklGEIuUpSeFGK6tvsjTKzlGfOdX9JNlkbLNJo776Kft3NqmpLzWcvHqkXcD8aQ1Uo1zVmntnlxjZhxnjdqE1s3jfGzxnbYz2m9bXrX0HAmjBw25t4e50pRNIrItp+Rm4la4x27nn9ZxJUwc7JqEYrLcnhJE2O7rdIprDSku6e6ffoeH8VcGvutU+eNVNMe+/Kl+GPTJx9R9KValiuq+xfi9mCfom8/PBv4b4rp18JKDcZfehYvbS+eH6kmUq6scGricVL6uNbhjo5y5rJ+9r7voao6xnE8QaiNc8Qk8x+6nDlXwiuvqXcL1asinlZ7rO6Zw5cNevVw8m/K9f4cg5Oyb6Rhj4yaS/LJ1SHDtO6NPGD2nY/rJr8O2IR+W/xJnbjx1i4cuW8qMBgYFZIiyZFhUwGACwX6Grmsivfkpwb+DJq1bfMJXp6a8FuERi9gUjTBTieQ+kjTSlokmm4O+n61L/kueHn3c3Jn3ZPYuXmU2OM4uMlGUZLDTSkmn1TRLNzSx8H+k+6+FdGnoc403Q5XCr2Y2uvkUYyS64W/wADTqtHKnhanNYur+qdT+9/qFKPIl3y3t8WfXHwCpLEeZLstppenMmZ5+GqXbC2zmslV+7VjzXW/wAUYLEeb/qayjjOPLx07Rr4dXhJvrhZ9cbnUiUUwNGDu5OVxiOy9T5V9IWbdVp9K3ivl+tku05OTjHPuXLL5n2PW1qUGeU1fhWnVzjO7nzWmoyrnyTWXn0azvhpoxnLZ41jXxDxbe1fVTXRVT/p9lZXFq3Uc/K1Kx9+6XxO3ruD89uls9quWonKqXJ7MpKMOZS26vCa+R9Vl4ConKMrJuxw+y51Vucfjg6FPhnSwnG2yMrZ1pqErJZ+rT68kViKb88ZOeOGW41co+RcV8COC5qrs+asi0vmjyFtU6puMtmn1T2eO6Z+ieNU80Mad11yx96Cl/8AD5R4m8J6yMJW2ck1F59hpY9+Ekd3N0PA3H5XZpvnKdi3hKcnKU443WXu2sM9gkfIfDV/1Wprk2niXRPOz269O59haJWoiAwI0RGaJkbOgEwJAkBE38G/er0I6TQys6bLzZ2KdBGrddSxm1pvswiuFnKiN9hj1Gqx0Kyu1etaiX0ShVFc8lzPr/Q4Fmt3zno+78uhiv1zk92/hv8AqRXs4cQrfRpkZXxfSSPDvUvz+aFHiE13fzGzT1t/G6KP3s1F9tnv6eZmXjDSv77+S/qeV4nOGohyXQViTysrOH0yvJnkNRw5U8yrguXmcts+7s+nQxlcp+nfix48rrJ9Q1HjfSppNv2v4V+WdzVo+MUzeapOS6uTjyxz5ZfX4HzHR8JjKassjFtRSXfZNtfqeijqsLCSSXki47/rHJMJdYvbX8UgujyZpWqb3ml6HlI6h/5sWxu9DTnp19bp5Q9pS517uqJ0zVsHBrPPFrd+aMWm1XVS6NYHpZr/ADJFfIOKcPlp9VyyTWJrDXdZPr844UPfXFvLy8uKObx3gMdXOE+bllBrdd1nbKZ19Wvax+GKXyRdkjOBLAEaRI2dCwjMgmdThvDXJ801t2T7+pr4fw1R3lu/yR1oQNSM2o1VJdER1UfZNGCFu5WXmdXc8tHLvtfdnY4rTiWTzurbbAqttyQixYFgiqdTz59lpLHdZ3M0p3L7kX6Tx/I3sDLUrmK27vX/AL/7GbWwvnHljCMc9+bL/Q7bRHlDW/px6XqVFJwg8bZ58ZXyL4u/8MF/3t/+p0eUeAm/pii7l2r+bN0Z4EytsqLVYzVRczCi2EgPQcO3KbXmTfmxcOk+Vvsl+YAIBgRSIz6EyNgHta69i2KAMm3M5FLZYymYGTW1KSw+55XX6bll/m56zU9Dj6+vKA89ZWQcDTasFTIrO0IvkiDiSilkWWSiRaDSGWPI8AQJjwAwIolBZYmydCyyj0Gmp/Ytr3fIoO5wylOvD7rD+Jxpww2vJtfIIgAwI0RGfQmRs6Ae3TDIskZG3NLmFJCgKyQGfUI5WqidSx7HN1S2IriamvJjaN+o6mJxAi2Qkgk8EHIlA0KSFzCcg0jgeAyMBMQMTAMG7hlWZehigjscNhgD0nD9kcriccWy97z80dKh4wc7if7x+iCMmAACNAjYtiRGfQD2ORtiwRmzbmmmUXyHKRXPfqBXJmPVvY12Mw6lkVy7kYcHR1HUyzgBktiU8prmipogo5BSiXNEJBYikJokMKqYkWNC+rAK0dzQ7fFHGq6nb0TWEB16pGDiK/aP4fobaNzBrnmxgZwAZGiI2dCZCzoB65yISYKRF7m3IskZSI2TMtluCKlfMw6iwVt2Smx7AUXSKHInYyiyWAI2ECWSMX2AhIhJF0oiwRYqURFrRBhUBgICyC3Ono5bHLijoaeWH6gd7TdDmXv2pZ82dKMsQz7mcrIIAADKgjZ0JEbOgHpVILJ4MddmWTnYbYKUjFqbS2238zBbLLAJMqsnsRc9sEWwK2yM4d/IlNlVk9gIOQmKsbQDUhggTIqLIYL5IrcQqpghyBATgbNNu0Y4nQ0dYHW1D5atu+xzjZrp7Rj8X/IyEIAACNAhZ0JkLOgHRjZhDnZsZbZ4KrbTbms1F2/oZpSyRlYm9zPO0C2Uit2ZKpWZI8+ALOYqnuLnI5AsrWB5KslikBLJZBIqUiyCIsFiKpSLZMosYVGRBA8giDRUjscPqy/gcmhZO/pFyQcvLf8AoBTrn+0a/Dt8igJPLy++4CrAAARQRs6EiFnQB2yX+dzDdqNw1T2Rks6fD+ZtzSla/MUpkF/Ib7gSUuw2iNfQsiBHkE3gtfT5me/oAc+RuZVHoJAW/WltdhkNdSIqzJB4JldpFEpIqj1EyUeoHS4fTk62qaUEu7f5IxcO6fIu1P2iioAQErQAAIAhZ0JkLOhYlf/Z' },
];

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleDemoSectionClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="App">
      <div
        className="blank-section"
        onClick={() => {
          setSelectedImage(null)
          setIsVisible(!isVisible)
        }}
        style={{ border: selectedImage ? 'none' : '1px solid black' }}
      >
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" />
        ) : (
          'Select an image to display in this area'
        )}
      </div>

      <div className="demo-sections" style={{ display: isVisible ? 'flex' : 'none' }}>
        {demoSections.map((section) => (
          <div
            key={section.id}
            className="demo-section"
            onClick={() => handleDemoSectionClick(section.image)}
          >
            <img width={200} height={200} src={section.image} alt={`Demo ${section.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
