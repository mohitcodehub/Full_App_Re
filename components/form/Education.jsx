import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";
import SpeechToText from "./SpeechToText";

const Education = () => {
    const { resumeData, setResumeData} = useContext(ResumeContext);
    const [activeField, setActiveField] = React.useState(null);

    const handleSpeechResult = (transcript, fieldName) => {
      const [field, index] = fieldName.split('-');
      const newEducation = [...resumeData.education];
      newEducation[parseInt(index)][field] = transcript;
      setResumeData({ ...resumeData, education: newEducation });
      setActiveField(null);
    };

    const toggleSpeech = (fieldName, isActive) => {
      setActiveField(isActive ? fieldName : null);
    };

    const handleEducation = (e, index) => {
      const newEducation = [...resumeData.education];
      newEducation[index][e.target.name] = e.target.value;
      setResumeData({ ...resumeData, education: newEducation });
    };
  
    const addEducation = () => {
      setResumeData({
        ...resumeData,
        education: [
          ...resumeData.education,
          { school: "", degree: "", startYear: "", endYear: "" },
        ],
      });
    };
  
    const removeEducation = (index) => {
      const newEducation = [...resumeData.education];
      newEducation[index] = newEducation[newEducation.length - 1];
      newEducation.pop();
      setResumeData({ ...resumeData, education: newEducation });
    };
    
    return (
      <div className="flex-col-gap-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="input-title">Education</h2>
          <SpeechToText 
            onResult={handleSpeechResult}
            targetField={activeField}
            isActive={activeField !== null}
            onToggle={(isActive) => toggleSpeech(activeField, isActive)}
          />
        </div>
        {resumeData.education.map((education, index) => (
          <div key={index} className="f-col">
            <input
              type="text"
              placeholder="School"
              name="school"
              className={`w-full other-input ${activeField === `school-${index}` ? 'ring-2 ring-green-500' : ''}`}
              value={education.school}
              onChange={(e) => handleEducation(e, index)}
              onFocus={() => setActiveField(`school-${index}`)}
            />
            <input
              type="text"
              placeholder="Degree"
              name="degree"
              className={`w-full other-input ${activeField === `degree-${index}` ? 'ring-2 ring-green-500' : ''}`}
              value={education.degree}
              onChange={(e) => handleEducation(e, index)}
              onFocus={() => setActiveField(`degree-${index}`)}
            />
            <div className="flex-wrap-gap-2">
              <input
                type="date"
                placeholder="Start Year"
                name="startYear"
                className="other-input"
                value={education.startYear}
                onChange={(e) => handleEducation(e, index)} />
              <input
                type="date"
                placeholder="End Year"
                name="endYear"
                className="other-input"
                value={education.endYear}
                onChange={(e) => handleEducation(e, index)} />
            </div>
          </div>
        ))}
        <FormButton size={resumeData.education.length} add={addEducation} remove={removeEducation} />
      </div>
    )
  }

export default Education;