(ns adventofcode.day13
  (require [clojure.math.combinatorics :as combo])
  (:require [clojure.string :as str]))

(defn parseline
  "Given a line from the input such as
  'David would gain 46 happiness units by sitting next to Alice.'
  this returns a seq with 4 values David, gain, 46 and Alice."
  [line]
  (rest (re-find #"^(\w+) would (\w+) (\d+) .+ (\w+)\.$" line)))

(def day13
  (-> "resources/day13input" slurp clojure.string/split-lines))

(defn xy-lookup
  "Turns a parsed line such as (Alice, gain, 2, Bob) into
  a name/value pair in a vector, thus:
  [(:Alice :Bob) 2]"
  [[person-x sign value person-y]]
  (let [v (*
           (case sign "lose" -1 "gain" 1)
           (Integer. value))]
    (vector (map keyword [person-x person-y]) v)))

(def points-map
  "Creates a map of values where the keys are the pairs of
  people who sit next to each other, and the values are the 
  happiness points gained or lost, for example:
  {(:Bob :Alice) 40, (:Bob :Carol) -61, (:Alice :Bob) 2, ...}"
  (->> day13
       (map parseline)
       (map xy-lookup)
       (into {})))

(def people
  "A list of all the people involved."
  (set (map first (keys points-map))))

(defn layouts
  "Given a list of people, work out all the different table layouts,
  where each one is a list, showing who sits next to whom round the
  table, like this: ((:Mallory :Carol) (:Carol :Frank) (:Frank ...) ...)"
  [people]
  (->>
    ;; Calculate the basic permutations
    ;;(combo/permutations (conj people :Self))
    (combo/permutations people)

    ;; Need to wrap around as it's a circular table,
    ;; so we go from e.g. (:a :b :c) to (:c :a :b :c)
    (map #(cons (last %) %))

    ;; Group into 'next to' each other tuples
    ;; so we go from e.g. (:c :a :b :c)
    ;; to ((:c :a) (:a :b) (:b :c))
    (map #(partition 2 1 %))

    ;; Create the reverse pairings too,
    ;; so from ((:c :a) (:a :b) (:b :c))
    ;; we get ((:c :a) (:a :b) (:b :c) (:a :c) (:b :a) (:c :b))
    (map #(concat (map identity %) (map reverse %)))))

(defn most-happy
  [people]
  "Given a list of people, find the most happiness points, by
  going through the layouts, working out the list of happiness points
  (the inner map) and then adding them up (the outer map)."
  (apply max
         (map #(reduce + (map (fn [pair] (get points-map pair 0)) %))
              (layouts people))))

(defn solve
  "..."
  [& args]
  (do

    ;; Part 1
    (println (most-happy people))

    ;; Part 2
    (println (most-happy (conj people :Self)))

    ))
