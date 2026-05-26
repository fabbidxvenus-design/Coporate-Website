
Running 5 tests using 4 workers

[1A[2K[1/5] [chromium] › tests\audit\accessibility.spec.ts:8:9 › Accessibility Audit › Audit /jobs for accessibility violations
[1A[2K[2/5] [chromium] › tests\audit\accessibility.spec.ts:8:9 › Accessibility Audit › Audit / for accessibility violations
[1A[2K[3/5] [chromium] › tests\audit\accessibility.spec.ts:8:9 › Accessibility Audit › Audit /news for accessibility violations
[1A[2K[4/5] [chromium] › tests\audit\accessibility.spec.ts:8:9 › Accessibility Audit › Audit /apply for accessibility violations
[1A[2K  1) [chromium] › tests\audit\accessibility.spec.ts:8:9 › Accessibility Audit › Audit / for accessibility violations 

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m

    [32m- Expected  -   1[39m
    [31m+ Received  + 120[39m

    [32m- Array [][39m
    [31m+ Array [[39m
    [31m+   Object {[39m
    [31m+     "description": "Ensure the main landmark is at top level",[39m
    [31m+     "help": "Main landmark should not be contained in another landmark",[39m
    [31m+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-main-is-top-level?application=playwright",[39m
    [31m+     "id": "landmark-main-is-top-level",[39m
    [31m+     "impact": "moderate",[39m
    [31m+     "nodes": Array [[39m
    [31m+       Object {[39m
    [31m+         "all": Array [],[39m
    [31m+         "any": Array [[39m
    [31m+           Object {[39m
    [31m+             "data": Object {[39m
    [31m+               "role": "main",[39m
    [31m+             },[39m
    [31m+             "id": "landmark-is-top-level",[39m
    [31m+             "impact": "moderate",[39m
    [31m+             "message": "The main landmark is contained in another landmark.",[39m
    [31m+             "relatedNodes": Array [],[39m
    [31m+           },[39m
    [31m+         ],[39m
    [31m+         "failureSummary": "Fix any of the following:[39m
    [31m+   The main landmark is contained in another landmark.",[39m
    [31m+         "html": "<main class=\"w-full\">",[39m
    [31m+         "impact": "moderate",[39m
    [31m+         "none": Array [],[39m
    [31m+         "target": Array [[39m
    [31m+           "#main-content > main",[39m
    [31m+         ],[39m
    [31m+       },[39m
    [31m+     ],[39m
    [31m+     "tags": Array [[39m
    [31m+       "cat.semantics",[39m
    [31m+       "best-practice",[39m
    [31m+     ],[39m
    [31m+   },[39m
    [31m+   Object {[39m
    [31m+     "description": "Ensure the document has at most one main landmark",[39m
    [31m+     "help": "Document should not have more than one main landmark",[39m
    [31m+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-main?application=playwright",[39m
    [31m+     "id": "landmark-no-duplicate-main",[39m
    [31m+     "impact": "moderate",[39m
    [31m+     "nodes": Array [[39m
    [31m+       Object {[39m
    [31m+         "all": Array [],[39m
    [31m+         "any": Array [[39m
    [31m+           Object {[39m
    [31m+             "data": null,[39m
    [31m+             "id": "page-no-duplicate-main",[39m
    [31m+             "impact": "moderate",[39m
    [31m+             "message": "Document has more than one main landmark",[39m
    [31m+             "relatedNodes": Array [[39m
    [31m+               Object {[39m
    [31m+                 "html": "<main class=\"w-full\">",[39m
    [31m+                 "target": Array [[39m
    [31m+                   "#main-content > main",[39m
    [31m+                 ],[39m
    [31m+               },[39m
    [31m+             ],[39m
    [31m+           },[39m
    [31m+         ],[39m
    [31m+         "failureSummary": "Fix any of the following:[39m
    [31m+   Document has more than one main landmark",[39m
    [31m+         "html": "<main id=\"main-content\" class=\"flex-1\">",[39m
    [31m+         "impact": "moderate",[39m
    [31m+         "none": Array [],[39m
    [31m+         "target": Array [[39m
    [31m+           "#main-content",[39m
    [31m+         ],[39m
    [31m+       },[39m
    [31m+     ],[39m
    [31m+     "tags": Array [[39m
    [31m+       "cat.semantics",[39m
    [31m+       "best-practice",[39m
    [31m+     ],[39m
    [31m+   },[39m
    [31m+   Object {[39m
    [31m+     "description": "Ensure landmarks are unique",[39m
    [31m+     "help": "Landmarks should have a unique role or role/label/title (i.e. accessible name) combination",[39m
    [31m+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright",[39m
    [31m+     "id": "landmark-unique",[39m
    [31m+     "impact": "moderate",[39m
    [31m+     "nodes": Array [[39m
    [31m+       Object {[39m
    [31m+         "all": Array [],[39m
    [31m+         "any": Array [[39m
    [31m+           Object {[39m
    [31m+             "data": Object {[39m
    [31m+               "accessibleText": null,[39m
    [31m+               "role": "main",[39m
    [31m+             },[39m
    [31m+             "id": "landmark-is-unique",[39m
    [31m+             "impact": "moderate",[39m
    [31m+             "message": "The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable",[39m
    [31m+             "relatedNodes": Array [[39m
    [31m+               Object {[39m
    [31m+                 "html": "<main class=\"w-full\">",[39m
    [31m+                 "target": Array [[39m
    [31m+                   "#main-content > main",[39m
    [31m+                 ],[39m
    [31m+               },[39m
    [31m+             ],[39m
    [31m+           },[39m
    [31m+         ],[39m
    [31m+         "failureSummary": "Fix any of the following:[39m
    [31m+   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable",[39m
    [31m+         "html": "<main id=\"main-content\" class=\"flex-1\">",[39m
    [31m+         "impact": "moderate",[39m
    [31m+         "none": Array [],[39m
    [31m+         "target": Array [[39m
    [31m+           "#main-content",[39m
    [31m+         ],[39m
    [31m+       },[39m
    [31m+     ],[39m
    [31m+     "tags": Array [[39m
    [31m+       "cat.semantics",[39m
    [31m+       "best-practice",[39m
    [31m+     ],[39m
    [31m+   },[39m
    [31m+ ][39m

      11 |       const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      12 |
    > 13 |       expect(accessibilityScanResults.violations).toEqual([]);
         |                                                   ^
      14 |     });
      15 |   }
      16 | });
        at D:\WORKSPACE\CODE\Coporate_Website\tests\audit\accessibility.spec.ts:13:51

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results\audit-accessibility-Access-7b244-or-accessibility-violations-chromium\test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results\audit-accessibility-Access-7b244-or-accessibility-violations-chromium\error-context.md


[1A[2K[5/5] [chromium] › tests\audit\accessibility.spec.ts:8:9 › Accessibility Audit › Audit /contact for accessibility violations
[1A[2K  2) [chromium] › tests\audit\accessibility.spec.ts:8:9 › Accessibility Audit › Audit /apply for accessibility violations 

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m

    [32m- Expected  -   1[39m
    [31m+ Received  + 153[39m

    [32m- Array [][39m
    [31m+ Array [[39m
    [31m+   Object {[39m
    [31m+     "description": "Ensure the order of headings is semantically correct",[39m
    [31m+     "help": "Heading levels should only increase by one",[39m
    [31m+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright",[39m
    [31m+     "id": "heading-order",[39m
    [31m+     "impact": "moderate",[39m
    [31m+     "nodes": Array [[39m
    [31m+       Object {[39m
    [31m+         "all": Array [],[39m
    [31m+         "any": Array [[39m
    [31m+           Object {[39m
    [31m+             "data": null,[39m
    [31m+             "id": "heading-order",[39m
    [31m+             "impact": "moderate",[39m
    [31m+             "message": "Heading order invalid",[39m
    [31m+             "relatedNodes": Array [],[39m
    [31m+           },[39m
    [31m+         ],[39m
    [31m+         "failureSummary": "Fix any of the following:[39m
    [31m+   Heading order invalid",[39m
    [31m+         "html": "<h4 class=\"text-base font-bold mb-4 text-white\">Follow Us</h4>",[39m
    [31m+         "impact": "moderate",[39m
    [31m+         "none": Array [],[39m
    [31m+         "target": Array [[39m
    [31m+           ".mb-8 > h4",[39m
    [31m+         ],[39m
    [31m+       },[39m
    [31m+     ],[39m
    [31m+     "tags": Array [[39m
    [31m+       "cat.semantics",[39m
    [31m+       "best-practice",[39m
    [31m+     ],[39m
    [31m+   },[39m
    [31m+   Object {[39m
    [31m+     "description": "Ensure the main landmark is at top level",[39m
    [31m+     "help": "Main landmark should not be contained in another landmark",[39m
    [31m+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-main-is-top-level?application=playwright",[39m
    [31m+     "id": "landmark-main-is-top-level",[39m
    [31m+     "impact": "moderate",[39m
    [31m+     "nodes": Array [[39m
    [31m+       Object {[39m
    [31m+         "all": Array [],[39m
    [31m+         "any": Array [[39m
    [31m+           Object {[39m
    [31m+             "data": Object {[39m
    [31m+               "role": "main",[39m
    [31m+             },[39m
    [31m+             "id": "landmark-is-top-level",[39m
    [31m+             "impact": "moderate",[39m
    [31m+             "message": "The main landmark is contained in another landmark.",[39m
    [31m+             "relatedNodes": Array [],[39m
    [31m+           },[39m
    [31m+         ],[39m
    [31m+         "failureSummary": "Fix any of the following:[39m
    [31m+   The main landmark is contained in another landmark.",[39m
    [31m+         "html": "<main class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12\">",[39m
    [31m+         "impact": "moderate",[39m
    [31m+         "none": Array [],[39m
    [31m+         "target": Array [[39m
    [31m+           ".max-w-7xl",[39m
    [31m+         ],[39m
    [31m+       },[39m
    [31m+     ],[39m
    [31m+     "tags": Array [[39m
    [31m+       "cat.semantics",[39m
    [31m+       "best-practice",[39m
    [31m+     ],[39m
    [31m+   },[39m
    [31m+   Object {[39m
    [31m+     "description": "Ensure the document has at most one main landmark",[39m
    [31m+     "help": "Document should not have more than one main landmark",[39m
    [31m+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-main?application=playwright",[39m
    [31m+     "id": "landmark-no-duplicate-main",[39m
    [31m+     "impact": "moderate",[39m
    [31m+     "nodes": Array [[39m
    [31m+       Object {[39m
    [31m+         "all": Array [],[39m
    [31m+         "any": Array [[39m
    [31m+           Object {[39m
    [31m+             "data": null,[39m
    [31m+             "id": "page-no-duplicate-main",[39m
    [31m+             "impact": "moderate",[39m
    [31m+             "message": "Document has more than one main landmark",[39m
    [31m+             "relatedNodes": Array [[39m
    [31m+               Object {[39m
    [31m+                 "html": "<main class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12\">",[39m
    [31m+                 "target": Array [[39m
    [31m+                   ".max-w-7xl",[39m
    [31m+                 ],[39m
    [31m+               },[39m
    [31m+             ],[39m
    [31m+           },[39m
    [31m+         ],[39m
    [31m+         "failureSummary": "Fix any of the following:[39m
    [31m+   Document has more than one main landmark",[39m
    [31m+         "html": "<main id=\"main-content\" class=\"flex-1\">",[39m
    [31m+         "impact": "moderate",[39m
    [31m+         "none": Array [],[39m
    [31m+         "target": Array [[39m
    [31m+           "#main-content",[39m
    [31m+         ],[39m
    [31m+       },[39m
    [31m+     ],[39m
    [31m+     "tags": Array [[39m
    [31m+       "cat.semantics",[39m
    [31m+       "best-practice",[39m
    [31m+     ],[39m
    [31m+   },[39m
    [31m+   Object {[39m
    [31m+     "description": "Ensure landmarks are unique",[39m
    [31m+     "help": "Landmarks should have a unique role or role/label/title (i.e. accessible name) combination",[39m
    [31m+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright",[39m
    [31m+     "id": "landmark-unique",[39m
    [31m+     "impact": "moderate",[39m
    [31m+     "nodes": Array [[39m
    [31m+       Object {[39m
    [31m+         "all": Array [],[39m
    [31m+         "any": Array [[39m
    [31m+           Object {[39m
    [31m+             "data": Object {[39m
    [31m+               "accessibleText": null,[39m
    [31m+               "role": "main",[39m
    [31m+             },[39m
    [31m+             "id": "landmark-is-unique",[39m
    [31m+             "impact": "moderate",[39m
    [31m+             "message": "The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable",[39m
    [31m+             "relatedNodes": Array [[39m
    [31m+               Object {[39m
    [31m+                 "html": "<main class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12\">",[39m
    [31m+                 "target": Array [[39m
    [31m+                   ".max-w-7xl",[39m
    [31m+                 ],[39m
    [31m+               },[39m
    [31m+             ],[39m
    [31m+           },[39m
    [31m+         ],[39m
    [31m+         "failureSummary": "Fix any of the following:[39m
    [31m+   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable",[39m
    [31m+         "html": "<main id=\"main-content\" class=\"flex-1\">",[39m
    [31m+         "impact": "moderate",[39m
    [31m+         "none": Array [],[39m
    [31m+         "target": Array [[39m
    [31m+           "#main-content",[39m
    [31m+         ],[39m
    [31m+       },[39m
    [31m+     ],[39m
    [31m+     "tags": Array [[39m
    [31m+       "cat.semantics",[39m
    [31m+       "best-practice",[39m
    [31m+     ],[39m
    [31m+   },[39m
    [31m+ ][39m

      11 |       const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      12 |
    > 13 |       expect(accessibilityScanResults.violations).toEqual([]);
         |                                                   ^
      14 |     });
      15 |   }
      16 | });
        at D:\WORKSPACE\CODE\Coporate_Website\tests\audit\accessibility.spec.ts:13:51

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results\audit-accessibility-Access-0357c-or-accessibility-violations-chromium\test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results\audit-accessibility-Access-0357c-or-accessibility-violations-chromium\error-context.md


[1A[2K  3) [chromium] › tests\audit\accessibility.spec.ts:8:9 › Accessibility Audit › Audit /news for accessibility violations 

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m

    [32m- Expected  -  1[39m
    [31m+ Received  + 70[39m

    [32m- Array [][39m
    [31m+ Array [[39m
    [31m+   Object {[39m
    [31m+     "description": "Ensure the order of headings is semantically correct",[39m
    [31m+     "help": "Heading levels should only increase by one",[39m
    [31m+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright",[39m
    [31m+     "id": "heading-order",[39m
    [31m+     "impact": "moderate",[39m
    [31m+     "nodes": Array [[39m
    [31m+       Object {[39m
    [31m+         "all": Array [],[39m
    [31m+         "any": Array [[39m
    [31m+           Object {[39m
    [31m+             "data": null,[39m
    [31m+             "id": "heading-order",[39m
    [31m+             "impact": "moderate",[39m
    [31m+             "message": "Heading order invalid",[39m
    [31m+             "relatedNodes": Array [],[39m
    [31m+           },[39m
    [31m+         ],[39m
    [31m+         "failureSummary": "Fix any of the following:[39m
    [31m+   Heading order invalid",[39m
    [31m+         "html": "<h3 class=\"text-lg font-bold text-gray-800 px-4 py-3 mb-2\">Tin tức Fabbi</h3>",[39m
    [31m+         "impact": "moderate",[39m
    [31m+         "none": Array [],[39m
    [31m+         "target": Array [[39m
    [31m+           ".p-4 > h3",[39m
    [31m+         ],[39m
    [31m+       },[39m
    [31m+     ],[39m
    [31m+     "tags": Array [[39m
    [31m+       "cat.semantics",[39m
    [31m+       "best-practice",[39m
    [31m+     ],[39m
    [31m+   },[39m
    [31m+   Object {[39m
    [31m+     "description": "Ensure the complementary landmark or aside is at top level",[39m
    [31m+     "help": "Aside should not be contained in another landmark",[39m
    [31m+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-complementary-is-top-level?application=playwright",[39m
    [31m+     "id": "landmark-complementary-is-top-level",[39m
    [31m+     "impact": "moderate",[39m
    [31m+     "nodes": Array [[39m
    [31m+       Object {[39m
    [31m+         "all": Array [],[39m
    [31m+         "any": Array [[39m
    [31m+           Object {[39m
    [31m+             "data": Object {[39m
    [31m+               "role": null,[39m
    [31m+             },[39m
    [31m+             "id": "landmark-is-top-level",[39m
    [31m+             "impact": "moderate",[39m
    [31m+             "message": "The null landmark is contained in another landmark.",[39m
    [31m+             "relatedNodes": Array [],[39m
    [31m+           },[39m
    [31m+         ],[39m
    [31m+         "failureSummary": "Fix any of the following:[39m
    [31m+   The null landmark is contained in another landmark.",[39m
    [31m+         "html": "<aside class=\"w-full lg:w-64 flex-shrink-0\">",[39m
    [31m+         "impact": "moderate",[39m
    [31m+         "none": Array [],[39m
    [31m+         "target": Array [[39m
    [31m+           "aside",[39m
    [31m+         ],[39m
    [31m+       },[39m
    [31m+     ],[39m
    [31m+     "tags": Array [[39m
    [31m+       "cat.semantics",[39m
    [31m+       "best-practice",[39m
    [31m+     ],[39m
    [31m+   },[39m
    [31m+ ][39m

      11 |       const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      12 |
    > 13 |       expect(accessibilityScanResults.violations).toEqual([]);
         |                                                   ^
      14 |     });
      15 |   }
      16 | });
        at D:\WORKSPACE\CODE\Coporate_Website\tests\audit\accessibility.spec.ts:13:51

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results\audit-accessibility-Access-bd30f-or-accessibility-violations-chromium\test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results\audit-accessibility-Access-bd30f-or-accessibility-violations-chromium\error-context.md


[1A[2K  4) [chromium] › tests\audit\accessibility.spec.ts:8:9 › Accessibility Audit › Audit /jobs for accessibility violations 

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m

    [32m- Expected  -  1[39m
    [31m+ Received  + 37[39m

    [32m- Array [][39m
    [31m+ Array [[39m
    [31m+   Object {[39m
    [31m+     "description": "Ensure the complementary landmark or aside is at top level",[39m
    [31m+     "help": "Aside should not be contained in another landmark",[39m
    [31m+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-complementary-is-top-level?application=playwright",[39m
    [31m+     "id": "landmark-complementary-is-top-level",[39m
    [31m+     "impact": "moderate",[39m
    [31m+     "nodes": Array [[39m
    [31m+       Object {[39m
    [31m+         "all": Array [],[39m
    [31m+         "any": Array [[39m
    [31m+           Object {[39m
    [31m+             "data": Object {[39m
    [31m+               "role": null,[39m
    [31m+             },[39m
    [31m+             "id": "landmark-is-top-level",[39m
    [31m+             "impact": "moderate",[39m
    [31m+             "message": "The null landmark is contained in another landmark.",[39m
    [31m+             "relatedNodes": Array [],[39m
    [31m+           },[39m
    [31m+         ],[39m
    [31m+         "failureSummary": "Fix any of the following:[39m
    [31m+   The null landmark is contained in another landmark.",[39m
    [31m+         "html": "<aside class=\"space-y-8\">",[39m
    [31m+         "impact": "moderate",[39m
    [31m+         "none": Array [],[39m
    [31m+         "target": Array [[39m
    [31m+           "aside",[39m
    [31m+         ],[39m
    [31m+       },[39m
    [31m+     ],[39m
    [31m+     "tags": Array [[39m
    [31m+       "cat.semantics",[39m
    [31m+       "best-practice",[39m
    [31m+     ],[39m
    [31m+   },[39m
    [31m+ ][39m

      11 |       const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      12 |
    > 13 |       expect(accessibilityScanResults.violations).toEqual([]);
         |                                                   ^
      14 |     });
      15 |   }
      16 | });
        at D:\WORKSPACE\CODE\Coporate_Website\tests\audit\accessibility.spec.ts:13:51

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results\audit-accessibility-Access-86d29-or-accessibility-violations-chromium\test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results\audit-accessibility-Access-86d29-or-accessibility-violations-chromium\error-context.md


[1A[2K  5) [chromium] › tests\audit\accessibility.spec.ts:8:9 › Accessibility Audit › Audit /contact for accessibility violations 

    Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoEqual[2m([22m[32mexpected[39m[2m) // deep equality[22m

    [32m- Expected  -   1[39m
    [31m+ Received  + 153[39m

    [32m- Array [][39m
    [31m+ Array [[39m
    [31m+   Object {[39m
    [31m+     "description": "Ensure the order of headings is semantically correct",[39m
    [31m+     "help": "Heading levels should only increase by one",[39m
    [31m+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/heading-order?application=playwright",[39m
    [31m+     "id": "heading-order",[39m
    [31m+     "impact": "moderate",[39m
    [31m+     "nodes": Array [[39m
    [31m+       Object {[39m
    [31m+         "all": Array [],[39m
    [31m+         "any": Array [[39m
    [31m+           Object {[39m
    [31m+             "data": null,[39m
    [31m+             "id": "heading-order",[39m
    [31m+             "impact": "moderate",[39m
    [31m+             "message": "Heading order invalid",[39m
    [31m+             "relatedNodes": Array [],[39m
    [31m+           },[39m
    [31m+         ],[39m
    [31m+         "failureSummary": "Fix any of the following:[39m
    [31m+   Heading order invalid",[39m
    [31m+         "html": "<h4 class=\"text-base font-bold mb-4 text-white\">Follow Us</h4>",[39m
    [31m+         "impact": "moderate",[39m
    [31m+         "none": Array [],[39m
    [31m+         "target": Array [[39m
    [31m+           ".mb-8 > h4",[39m
    [31m+         ],[39m
    [31m+       },[39m
    [31m+     ],[39m
    [31m+     "tags": Array [[39m
    [31m+       "cat.semantics",[39m
    [31m+       "best-practice",[39m
    [31m+     ],[39m
    [31m+   },[39m
    [31m+   Object {[39m
    [31m+     "description": "Ensure the main landmark is at top level",[39m
    [31m+     "help": "Main landmark should not be contained in another landmark",[39m
    [31m+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-main-is-top-level?application=playwright",[39m
    [31m+     "id": "landmark-main-is-top-level",[39m
    [31m+     "impact": "moderate",[39m
    [31m+     "nodes": Array [[39m
    [31m+       Object {[39m
    [31m+         "all": Array [],[39m
    [31m+         "any": Array [[39m
    [31m+           Object {[39m
    [31m+             "data": Object {[39m
    [31m+               "role": "main",[39m
    [31m+             },[39m
    [31m+             "id": "landmark-is-top-level",[39m
    [31m+             "impact": "moderate",[39m
    [31m+             "message": "The main landmark is contained in another landmark.",[39m
    [31m+             "relatedNodes": Array [],[39m
    [31m+           },[39m
    [31m+         ],[39m
    [31m+         "failureSummary": "Fix any of the following:[39m
    [31m+   The main landmark is contained in another landmark.",[39m
    [31m+         "html": "<main id=\"main-content\" class=\"bg-[#fbf9f8] min-h-screen\">",[39m
    [31m+         "impact": "moderate",[39m
    [31m+         "none": Array [],[39m
    [31m+         "target": Array [[39m
    [31m+           ".bg-\\[\\#fbf9f8\\]",[39m
    [31m+         ],[39m
    [31m+       },[39m
    [31m+     ],[39m
    [31m+     "tags": Array [[39m
    [31m+       "cat.semantics",[39m
    [31m+       "best-practice",[39m
    [31m+     ],[39m
    [31m+   },[39m
    [31m+   Object {[39m
    [31m+     "description": "Ensure the document has at most one main landmark",[39m
    [31m+     "help": "Document should not have more than one main landmark",[39m
    [31m+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-no-duplicate-main?application=playwright",[39m
    [31m+     "id": "landmark-no-duplicate-main",[39m
    [31m+     "impact": "moderate",[39m
    [31m+     "nodes": Array [[39m
    [31m+       Object {[39m
    [31m+         "all": Array [],[39m
    [31m+         "any": Array [[39m
    [31m+           Object {[39m
    [31m+             "data": null,[39m
    [31m+             "id": "page-no-duplicate-main",[39m
    [31m+             "impact": "moderate",[39m
    [31m+             "message": "Document has more than one main landmark",[39m
    [31m+             "relatedNodes": Array [[39m
    [31m+               Object {[39m
    [31m+                 "html": "<main id=\"main-content\" class=\"bg-[#fbf9f8] min-h-screen\">",[39m
    [31m+                 "target": Array [[39m
    [31m+                   ".bg-\\[\\#fbf9f8\\]",[39m
    [31m+                 ],[39m
    [31m+               },[39m
    [31m+             ],[39m
    [31m+           },[39m
    [31m+         ],[39m
    [31m+         "failureSummary": "Fix any of the following:[39m
    [31m+   Document has more than one main landmark",[39m
    [31m+         "html": "<main id=\"main-content\" class=\"flex-1\">",[39m
    [31m+         "impact": "moderate",[39m
    [31m+         "none": Array [],[39m
    [31m+         "target": Array [[39m
    [31m+           ".flex-1",[39m
    [31m+         ],[39m
    [31m+       },[39m
    [31m+     ],[39m
    [31m+     "tags": Array [[39m
    [31m+       "cat.semantics",[39m
    [31m+       "best-practice",[39m
    [31m+     ],[39m
    [31m+   },[39m
    [31m+   Object {[39m
    [31m+     "description": "Ensure landmarks are unique",[39m
    [31m+     "help": "Landmarks should have a unique role or role/label/title (i.e. accessible name) combination",[39m
    [31m+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/landmark-unique?application=playwright",[39m
    [31m+     "id": "landmark-unique",[39m
    [31m+     "impact": "moderate",[39m
    [31m+     "nodes": Array [[39m
    [31m+       Object {[39m
    [31m+         "all": Array [],[39m
    [31m+         "any": Array [[39m
    [31m+           Object {[39m
    [31m+             "data": Object {[39m
    [31m+               "accessibleText": null,[39m
    [31m+               "role": "main",[39m
    [31m+             },[39m
    [31m+             "id": "landmark-is-unique",[39m
    [31m+             "impact": "moderate",[39m
    [31m+             "message": "The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable",[39m
    [31m+             "relatedNodes": Array [[39m
    [31m+               Object {[39m
    [31m+                 "html": "<main id=\"main-content\" class=\"bg-[#fbf9f8] min-h-screen\">",[39m
    [31m+                 "target": Array [[39m
    [31m+                   ".bg-\\[\\#fbf9f8\\]",[39m
    [31m+                 ],[39m
    [31m+               },[39m
    [31m+             ],[39m
    [31m+           },[39m
    [31m+         ],[39m
    [31m+         "failureSummary": "Fix any of the following:[39m
    [31m+   The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable",[39m
    [31m+         "html": "<main id=\"main-content\" class=\"flex-1\">",[39m
    [31m+         "impact": "moderate",[39m
    [31m+         "none": Array [],[39m
    [31m+         "target": Array [[39m
    [31m+           ".flex-1",[39m
    [31m+         ],[39m
    [31m+       },[39m
    [31m+     ],[39m
    [31m+     "tags": Array [[39m
    [31m+       "cat.semantics",[39m
    [31m+       "best-practice",[39m
    [31m+     ],[39m
    [31m+   },[39m
    [31m+ ][39m

      11 |       const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      12 |
    > 13 |       expect(accessibilityScanResults.violations).toEqual([]);
         |                                                   ^
      14 |     });
      15 |   }
      16 | });
        at D:\WORKSPACE\CODE\Coporate_Website\tests\audit\accessibility.spec.ts:13:51

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results\audit-accessibility-Access-83507-or-accessibility-violations-chromium\test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results\audit-accessibility-Access-83507-or-accessibility-violations-chromium\error-context.md


[1A[2K  5 failed
    [chromium] › tests\audit\accessibility.spec.ts:8:9 › Accessibility Audit › Audit / for accessibility violations 
    [chromium] › tests\audit\accessibility.spec.ts:8:9 › Accessibility Audit › Audit /jobs for accessibility violations 
    [chromium] › tests\audit\accessibility.spec.ts:8:9 › Accessibility Audit › Audit /news for accessibility violations 
    [chromium] › tests\audit\accessibility.spec.ts:8:9 › Accessibility Audit › Audit /apply for accessibility violations 
    [chromium] › tests\audit\accessibility.spec.ts:8:9 › Accessibility Audit › Audit /contact for accessibility violations 
npm notice
npm notice New minor version of npm available! 11.11.0 -> 11.15.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.15.0
npm notice To update run: npm install -g npm@11.15.0
npm notice
