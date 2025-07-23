import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import SpeechToText from "./SpeechToText";

const PersonalInformation = ({}) => {
  const { resumeData, setResumeData, handleProfilePicture, handleChange } =
    useContext(ResumeContext);

  const [activeField, setActiveField] = React.useState(null);

  const handleSpeechResult = (transcript, fieldName) => {
    setResumeData({ ...resumeData, [fieldName]: transcript });
    setActiveField(null);
  };

  const toggleSpeech = (fieldName, isActive) => {
    setActiveField(isActive ? fieldName : null);
  };

  return (
    <div className="flex-col-gap-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="input-title">Personal Information</h2>
        <SpeechToText 
          onResult={handleSpeechResult}
          targetField={activeField}
          isActive={activeField !== null}
          onToggle={(isActive) => toggleSpeech(activeField, isActive)}
        />
      </div>
      <div className="grid-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            className={`pi ${activeField === 'name' ? 'ring-2 ring-green-500' : ''}`}
            value={resumeData.name}
            onChange={handleChange}
            onFocus={() => setActiveField('name')}
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Job Title"
            name="position"
            className={`pi ${activeField === 'position' ? 'ring-2 ring-green-500' : ''}`}
            value={resumeData.position}
            onChange={handleChange}
            onFocus={() => setActiveField('position')}
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Contact Information"
            name="contactInformation"
            className={`pi ${activeField === 'contactInformation' ? 'ring-2 ring-green-500' : ''}`}
            value={resumeData.contactInformation}
            onChange={handleChange}
            onFocus={() => setActiveField('contactInformation')}
            minLength="10"
            maxLength="15"
          />
        </div>
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className={`pi ${activeField === 'email' ? 'ring-2 ring-green-500' : ''}`}
            value={resumeData.email}
            onChange={handleChange}
            onFocus={() => setActiveField('email')}
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Address"
            name="address"
            className={`pi ${activeField === 'address' ? 'ring-2 ring-green-500' : ''}`}
            value={resumeData.address}
            onChange={handleChange}
            onFocus={() => setActiveField('address')}
          />
        </div>
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          className="profileInput"
          onChange={handleProfilePicture}
          placeholder="Profile Picture"
        />
      </div>
    </div>
  );
};

export default PersonalInformation;
