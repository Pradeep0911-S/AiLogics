# Azure Communication Services (ACS)



### What is changing



Microsoft is moving communication workloads toward Teams, Dynamics 365, and Azure-integrated experiences, while directing standalone CPaaS use cases to third-party providers.



###### There are two categories:



| Change type     | What it means                                                                                               |  

| --------------- | ------------------------------------------------------------------------------------------------------------| 

| Retired         | Service/SDK will be permanently unavailable                                                                 | 

| Breaking change | Service remains available, but only in supported Teams-aligned scenarios and with updated major-version SDKs| 









| Product capability                    | ACS Call Automation feature used                           | Where it is used                                                                             |

| ------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------- |

| Attach backend to an active room call | connectCall(roomCallLocator, callbackUrl, options)         | CallAutomationClientService ACS\_SDK\_Reference.docx                                           |

| Reuse an active call connection       | getCallConnection(id)                                      | CallAutomationClientService, InternalCallService, IVRServerService ACS\_SDK\_Reference.docx    |

| Read live call state                  | getCallConnectionProperties()                              | Call state, callConnectionId, serverCallId ACS\_SDK\_Reference.docx                            |

| End call for all participants         | hangUp(true)                                               | PstnCallService, InternalCallService ACS\_SDK\_Reference.docx                                  |

| Dial a phone number into the room     | addParticipant(...) with PSTN target                       | PstnCallService; product allows up to four external PSTN participants ACS\_SDK\_Reference.docx |

| Remove a PSTN participant             | removeParticipant(...)                                     | PstnCallService ACS\_SDK\_Reference.docx                                                       |

| Add/remove an ACS user                | addParticipant / removeParticipant                         | IVR attend flow and IVR server service ACS\_SDK\_Reference.docx                                |

| Check whether a user is present       | getParticipant(...)                                        | IVRServerService ACS\_SDK\_Reference.docx                                                      |

| List call participants                | listParticipants()                                         | PstnCallService ACS\_SDK\_Reference.docx                                                       |

| Start/stop call recording             | getCallRecording().start() / .stop()                       | CallRecordingService; MP4 for VRI, MP3 for OPI ACS\_SDK\_Reference.docx                        |

| Download recording                    | getCallRecording().downloadStreaming(contentLocation)      | Streams recording to S3 ACS\_SDK\_Reference.docx                                               |

| Delete ACS recording copy             | getCallRecording().delete(deleteLocation)                  | After S3 upload ACS\_SDK\_Reference.docx                                                       |

| Start/stop live transcription         | getCallMedia().startTranscription() / .stopTranscription() | AzureTranscriptionService ACS\_SDK\_Reference.docx                                             |

| Change transcription language         | getCallMedia().updateTranscription(locale)                 | Mid-call language switch ACS\_SDK\_Reference.docx                                              |

| Receive call lifecycle events         | ACS / Event Grid callback webhook                          | /common/v1/call-events-web-hooks ACS\_SDK\_Reference.docx                                      |







Highest-impact areas



1\. PSTN dial-in and dial-out

The product dials phone participants into ACS Rooms and removes them during the call. This is directly affected because ACS Direct Offer phone numbers and Direct Routing are retiring, while PSTN calling must move to a Teams Phone-based connectivity model.



Impact: PSTN add/remove participant flows, external-call limits, phone-number inventory, carrier/regulatory setup, and callback event handling all need redesign.



Primary migration option: Teams Phone Extensibility with ACS Call Automation. Microsoft identifies TPE as the supported route for PSTN scenarios using Call Automation.



2\. Recording and S3 upload

The product starts/stops recordings, downloads them, and uploads them to S3 before deleting the ACS copy. Call Recording remains available only in eligible Teams scenarios and with updated SDKs.



Impact: Recording APIs, storage flow, file formats, retention, consent, access control, and webhook-based recording lifecycle events may change.



Risk: Teams Meeting Interoperability alone does not automatically establish support for Call Automation recording; the specific TPE configuration and documented capability must be validated.



3\. Live transcription and language switching

The product starts, stops, resumes, and changes locale for live captions. Transcription remains supported only in eligible Teams call scenarios where real-time transcription is documented, including supported TPE configurations.



Impact: The application’s transcription state machine—start, stop, resume, delete, and locale update—must be revalidated against the target platform’s supported transcription capabilities.



4\. Server-side call control

The product relies heavily on server-side operations: connect to room calls, inspect state, add/remove participants, and hang up. These are core Call Automation capabilities, but their availability and behavior will depend on the chosen Teams-aligned integration.



Impact: The team must build a capability matrix before committing to TPE, because Microsoft warns that eligibility does not guarantee feature parity.





























Your research would be stronger with a feature-by-feature compatibility check, plus pricing, licensing, connectivity and required code changes. We can add those as we go rather than doing everything now.

